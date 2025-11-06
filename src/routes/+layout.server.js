import { getAllTitles } from "$lib/server/db";

export async function load() {
    
    const res = await getAllTitles();
    
    return {};
}