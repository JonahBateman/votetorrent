import { apply, BlockId, BlockStore, get } from "../blocks";
import { ITreeNode } from "./nodes";
import { ITreeTrunk } from "./trunk";
import { TreeBlock, TreeRootBlockType, rootId$ } from "./tree-block";

export class IndependentTrunk implements ITreeTrunk {
	protected constructor(
		public readonly treeId: BlockId,
		public readonly store: BlockStore<TreeBlock>,
	) { }

	static create(
		store: BlockStore<TreeBlock>,
		rootId: BlockId,
		newId?: BlockId,
	) {
		const trunkBlock = {
			header: store.createBlockHeader(TreeRootBlockType, newId),
			rootId,
		};
		store.insert(trunkBlock);
		return new IndependentTrunk(trunkBlock.header.id, store);
	}

	static async from(store: BlockStore<TreeBlock>, id: BlockId) {
		const block = get(store, id);
		return new IndependentTrunk(id, store);
	}

	block() {
		return get(this.store, this.treeId);
	}

	async get(): Promise<ITreeNode> {
		const block = await get(this.store, this.treeId);
		return await get(this.store, block.rootId);
	}

	async set(node: ITreeNode): Promise<void> {
		const block = await get(this.store, this.treeId);
		apply(this.store, block, [rootId$, 0, 1, node.header.id]);
	}

	async getId(): Promise<BlockId> {
		const block = await get(this.store, this.treeId);
		return block.rootId;
	}

	// Warning: only removes trunk.  Use BTree.drop for full tree removal
	drop() {
		this.store.delete(this.treeId);
	}
}
