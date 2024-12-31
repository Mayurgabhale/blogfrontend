import { User } from "./user.interface";

export interface BlogEntry{
    id?:number;
    title?:string;
    slug?: string;
    description?:string;
    createdAt?:Date;
    updatedAt?:Date;
    author?:User;
}



export interface Meta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface Links {
    first: string;
    previous: string;
    next: string;
    last: string;
}

export interface BlogEntriesPageable {
    items: BlogEntry[];
    meta: Meta;
    links: Links;
}