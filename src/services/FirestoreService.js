import db from "@/firebase/config";
import store from "@/store"

export default {

    setMediaWatchlistState(mediaId, mediaType, onWatchlist) {
        return db.collection("users")
            .doc(store.state.user.uid)
            .collection("watchlist")
            .doc(mediaId.toString())
            .set({
                media_type: mediaType,
                watchlist: onWatchlist,
                media_id: mediaId
            })
            .catch((error) => {
                console.error("error settingWatchlistState: ", error);
            });
    },

    async getIsOnWatchlist(mediaId, mediaType) {
        const query = db.collection("users")
            .doc(store.state.user.uid)
            .collection("watchlist")
            .where("watchlist", "==", true)
            .where("media_id", "==", mediaId)
            .where("media_type", "==", mediaType);

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
    }
}