const knex = require('../db/knex')


function getSnackReviews(id) {
    return knex('reviews')
		.where({ 'snack_id': id })
}

function getReviewById(id) {
	return knex('reviews')
		.where({ id })
		.first()
		.then(foundReview => {
			if (!foundReview) throw new Error('reviewNotFound')
			return foundReview
		})
}

function create(snack_id, body) {
	return knex('reviews')
		.insert({ snack_id, ...body })
		.returning(['*'])
}

function update(id, body) {
	return knex('reviews')
		.where({ id })
		.update( body )
		.returning(['*'])  
}

function destroy(id) {
	return knex('reviews')
		.where({ id })
		.del()
		.returning(['*'])
}


module.exports = { getSnackReviews, getReviewById, create, update, destroy }