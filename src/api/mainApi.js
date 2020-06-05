import axios from 'axios'

const service = axios.create({
    baseURL: 'http://api.tvmaze.com/',
})

export function getShows(param) {
    return service.get("/search/shows", {
        params: {
            q:param,
        },
    })
}