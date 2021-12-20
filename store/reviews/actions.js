export default {
    async deleteReview(context, payload) {
        try {
            const { reviewId, route } = payload
          await this.$axios.$delete(
            `/api/products/${route}/reviews`,
            {data: { reviewId }}
          );
          return;
        } catch (err) {
          this.$router.push({
            path: "/error",
            query: { status: err.response.status, msg: err.response.data }
          });
        }
      },
      async addReview(context, payload) {
        try {
          const { review, rating, isAuth, route } = payload
          if (isAuth) {
            const postedReview = await this.$axios.$post(
              `/api/products/${route}/reviews`,
              { review, rating }
            );
            if (postedReview.error) {
              context.dispatch('setErrorMessage', postedReview.error, { root: true })
            } else {
              return postedReview;
            }
          }
        } catch (err) {
          this.$router.push({
            path: "/error",
            query: { status: err.response.status, msg: err.response.data }
          });
        }
      },
}