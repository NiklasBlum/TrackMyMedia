import store from "@/store"
import axios from "axios";

export default {
    async getShowDetails(showId) {
        let searchQuery = `${store.state.baseUrl}tv/${showId}?api_key=${store.state.apiKey}&language=${this.language}&append_to_response=videos`;
        let response = await axios.get(searchQuery);
        return response.data;
    },
    async getReviews(mediaType, id) {
        let searchQuery = `${store.state.baseUrl}${mediaType}/${id}/reviews?api_key=${store.state.apiKey}&language=${this.language}&page=1`;
        let response = await axios.get(searchQuery);

        if (response.data) {
            return response.data.results;
        }
        return null;
    },

    async getEpisodes(showId, seasonNumber) {
        let searchQuery = `${store.state.baseUrl}tv/${showId}/season/${seasonNumber}?api_key=${store.state.apiKey}&language=${store.state.language}`;

        let response = await axios.get(searchQuery);
        if (response.data) {
            return response.data.episodes
        }
        return null;
    },

    async getFreeStreamingProviders(mediaType, mediaId) {
        let searchQuery = `${store.state.baseUrl}${mediaType}/${mediaId}/watch/providers?api_key=${store.state.apiKey}`;

        let response = await axios.get(searchQuery);
        try {
            if (response.data) {
                return response.data.results.DE.flatrate;
            }
        } catch (error) {
            return null;
        }
    },

    async getMediaFromTmdbById(id) {
        let query = `${store.state.baseUrl}${store.state.currentMedia}/${id}?api_key=${store.state.apiKey}&language=${store.state.language}`;
        let response = await axios.get(query);
        if (response.data) {
            return response.data;
        }
        return null;
    },

    async getMediaBySearch(searchText, page) {
        this.loading = true;
        let searchQuery = `${store.state.baseSearchUrl}${store.state.currentMedia}?api_key=${store.state.apiKey}&language=${store.state.language}
        &page=${page}&query=${searchText}`;
        let response = await axios.get(searchQuery);
        try {
            if (response.data) {

                return response.data.results;
            }
        } catch (error) {
            console.log(error);
        }
    },
}