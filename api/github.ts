// @ts-ignore
import { GithubItem } from '~/types';
import { NuxtAxiosInstance } from '~/node_modules/@nuxtjs/axios';

const auth = process.env.GITHUB_TOKEN;
const username = process.env.GITHUB_USERNAME;

export function repos($axios: NuxtAxiosInstance) {
    return $axios
        .$get(`https://api.github.com/users/${username}/repos`, {
            headers: {
                Authorization: `token ${auth}`,
                'Content-Type': 'application/json',
            },
        })
        .then((data: any[]) => {
            // Only get non forked repos
            const resReduce = data.filter((item: GithubItem | any) => {
                return !item.fork;
            });

            return resReduce.map((item: GithubItem) => {
                return {
                    id: item.id,
                    description: item.description,

                    // eslint-disable-next-line @typescript-eslint/camelcase
                    full_name: item.full_name,

                    // eslint-disable-next-line @typescript-eslint/camelcase
                    html_url: item.html_url,
                };
            });
        });
}

// @ts-ignore
export function snippets($axios) {
    return $axios
        .$get(`https://api.github.com/users/${username}/gists`, {
            headers: {
                Authorization: `token ${auth}`,
                'Content-Type': 'application/json',
            },
        })
        .then((data: any[]) =>
            data.map((item: GithubItem) => {
                return {
                    id: item.id,
                    description: item.description,
                    html_url: item.html_url,
                };
            })
        );
}
