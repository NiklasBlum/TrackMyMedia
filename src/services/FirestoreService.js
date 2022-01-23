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
                return querySnapshot.docs[0].data().onWatchlist;
            }
        } catch (error) {
            console.log('Error getting watchlist: ', error);
        }
    },

    async getMediaOnWatchlistTmdbIds() {
        const query = db.collection("media")
            .where("mediaType", "==", store.state.currentMedia)
            .where("onWatchlist", "==", true);

        const tmdbIds = [];
        await query.get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    tmdbIds.push(doc.data().tmdbId);
                });
            });
        return tmdbIds;
    },

    async getMediaWatchedTmdbIds(mediaType) {
        const query = db.collection("media")
            .where("mediaType", "==", mediaType)
            .where("watched", "==", true);

        const tmdbIds = [];
        await query.get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    tmdbIds.push(doc.data().tmdbId);
                });
            });
        return tmdbIds;
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

    async setMediaWatchState(media, mediaType, watchState) {
        const query = db.collection("media")
            .where("userId", "==", store.state.user.uid)
            .where("tmdbId", "==", media.id)
            .where("mediaType", "==", mediaType);
        try {
            const querySnapshot = await query.get();
            console.log(querySnapshot);
            if (querySnapshot.empty) {
                db.collection("media").add({
                    userId: store.state.user.uid,
                    tmdbId: media.id,
                    mediaType: mediaType,
                    title: mediaType == 'movie' ? media.title : media.name,
                    onWatchlist: false,
                    watched: watchState,
                    watchedAt: new Date(new Date().toDateString())
                })
            }
            else {
                console.log("updated media");
                db.collection("media").doc(querySnapshot.docs[0].id).update({
                    watched: watchState,
                    watchedAt: watchState ? new Date(new Date().toDateString()) : null
                })
            }
        } catch (error) {
            console.log('Error getting watchlist: ', error);
        }
    }
}