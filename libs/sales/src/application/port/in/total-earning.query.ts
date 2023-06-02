export abstract class TotalEarningQuery {
    abstract execute(): Promise<number>;
}
