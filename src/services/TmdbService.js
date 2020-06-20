import store from "@/store"
import axios from "axios";

export default {
    async getReviews(mediaType, id) {
        let searchQuery = `${store.state.baseUrl}${mediaType}/${id}/reviews?api_key=${store.state.apiKey}&language=en-US&page=1`;
        let reviews = await axios.get(searchQuery);

        if (reviews.data) {
            return reviews.data.results;
        }
        return null;
    },
    getDetails(mediaType, id) {
        let searchQuery = `${this.baseUrl}${mediaType}/${id}?api_key=${store.state.apiKey}&language=${store.state.language}&append_to_response=videos`;
        axios
            .get(searchQuery)
            .then(response => {
                this.movie = response.data;
                this.posterPath = this.posterUrl + this.movie.poster_path;
                this.trailerId = this.movie.videos.results[0].key;
            })
            .catch(error => {
                console.log(error);
            });
    },
}
