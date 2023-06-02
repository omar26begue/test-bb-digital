export abstract class DeleteProductCommand {
    abstract execute(sku: string): Promise<void>;
}
