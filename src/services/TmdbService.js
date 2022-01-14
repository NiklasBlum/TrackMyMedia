import store from "@/store"
import axios from "axios";

export default {
    async getReviews(mediaType, id) {
        let searchQuery = `${store.state.baseUrl}${mediaType}/${id}/reviews?api_key=${store.state.apiKey}&language=en-US&page=1`;
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
        console.log(searchQuery);
        let response = await axios.get(searchQuery);
        try {
            if (response.data) {
                return response.data.results.DE.flatrate;
            }
        } catch (error) {
            return null;
        }


    },

}
