import db from "@/firebase/config";
import store from "@/store"

export default {

    async setWatchlistState(media, mediaType, onWatchlist) {
        const query = db.collection("media")
            .where("userId", "==", store.state.user.uid)
            .where("tmdbId", "==", media.id)
            .where("mediaType", "==", mediaType);

        try {
            const querySnapshot = await query.get();
            if (querySnapshot.empty) {
                db.collection("media").add({
                    userId: store.state.user.uid,
                    tmdbId: media.id,
                    mediaType: mediaType,
                    title: mediaType == 'movie' ? media.title : media.name,
                    onWatchlist: onWatchlist,
                    watched: false,
                    watchedAt: null
                })
            }
            else {
                db.collection("media").doc(querySnapshot.docs[0].id).update({
                    onWatchlist: onWatchlist
                })
            }
        } catch (error) {
            console.log('Error getting watchlist: ', error);
        }
    },

    async getWatchlistState(mediaId, mediaType) {
        const query = db.collection("media")
            .where("userId", "==", store.state.user.uid)
            .where("tmdbId", "==", mediaId)
            .where("mediaType", "==", mediaType);
        try {
            const querySnapshot = await query.get();
            if (querySnapshot.empty) {
                return false;
            }
            else {
                return true;
            }
        } catch (error) {
            console.log('Error getting watchlist: ', error);
        }
    },

    async createUserIfNotExists() {
        const query = db.collection("user").where("userId", "==", store.state.user.uid);
        try {
            const querySnapshot = await query.get();
            if (querySnapshot.empty) {
                db.collection("user").add({
                    userId: store.state.user.uid,
                    name: store.state.user.displayName,
                    email: store.state.user.email,
                    firstLogin: new Date(Date.now()),
                })
            }
        } catch (error) {
            console.log('Error when settings User: ', error);
        }
    },

    async getMediaWatchState(mediaId, mediaType) {
        const query = db.collection("media")
            .where("userId", "==", store.state.user.uid)
            .where("tmdbId", "==", mediaId)
            .where("mediaType", "==", mediaType);
        try {
            const querySnapshot = await query.get();
            if (querySnapshot.empty) {
                return {
                    watched: false,
                    watchedAt: null
                }
            }
            return {
                watched: querySnapshot.docs[0].data().watched,
                watchedAt: querySnapshot.docs[0].data().watchedAt
            }
        } catch (error) {
            console.log('Error getting watchlist: ', error);
        }
    },

    async setMediaWatchState(mediaId, mediaType) {
        const query = db.collection("media")
            .where("userId", "==", store.state.user.uid)
            .where("tmdbId", "==", mediaId)
            .where("mediaType", "==", mediaType);
        try {
            const querySnapshot = await query.get();
            if (querySnapshot.empty) {
                return {
                    watched: false,
                    watchedAt: null
                }
            }
            return {
                watched: querySnapshot.docs[0].data().watched,
                watchedAt: querySnapshot.docs[0].data().watchedAt
            }
        } catch (error) {
            console.log('Error getting watchlist: ', error);
        }
    }
}