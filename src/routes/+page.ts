
export const ssr = true;
export const csr = true;
export const prerender = true;

type MainPageData = {
    streamed: {
        publications: Promise<unknown[]>
    }
}

/** @type {import('./$types').PageServerLoad} */
export async function load(): Promise<MainPageData> {

    try {
        return {
            streamed: {
                publications: new Promise((resolve) => {
                    resolve([]);
                })
            },
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

