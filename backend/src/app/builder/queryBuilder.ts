
import { FilterQuery, Query } from "mongoose";
class queryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        const searchTerm = this.query.search as string;
        if (searchTerm) {
           this.modelQuery = this.modelQuery.find({
            $or: searchableFields.map((field)=>({
                 [field]: {$regex: searchTerm, $options: 'i'}
            }))
           } as FilterQuery<T>)
        }
        return this;
    }

    filter() {
        const queryObj = { ...this.query };
        const excludedFields = ["page", "sort", "limit", "fields", "search", "sortBy", "sortOrder"];
        excludedFields.forEach((el) => {
            delete queryObj[el];
        });
        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

        return this;
        
    }

    sort() {
        const sort = this.query.sort as string || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
}

export default queryBuilder;