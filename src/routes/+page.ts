import { ExplorePublicationType, ExplorePublicationsOrderByType, LimitType, type PostFragment } from "@lens-protocol/client";
import { lensClient } from "../lib/lensClient";

export const ssr = true;
export const csr = true;
export const prerender = true;

type MainPageData = {
    streamed: {
        publications: Promise<PostFragment[]>
    }
}

/** @type {import('./$types').PageServerLoad} */
export async function load(): Promise<MainPageData> {

    try {
        return {
            streamed: {
                publications: new Promise((resolve) => {
                    lensClient.explore.publications({
                        limit: LimitType.Ten,
                        where: {
                            publicationTypes: [ExplorePublicationType.Post]
                        },
                        orderBy: ExplorePublicationsOrderByType.Latest
                    }).then((publications) => {
                        resolve(publications.items as PostFragment[]);
                    }).catch(console.error);
                })
            },
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

