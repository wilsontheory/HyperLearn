subject_array = @subjects.to_a.sort_by{|e| e.title.downcase}

json.set! :alphabetical do
  json.array! subject_array do |subject|
    json.extract! subject, :title, :user_id, :id
    if (subject.ratings.length > 0)
      json.mastery (100 * (subject.ratings.where(user_id: current_user.id).collect(&:rating).reduce(:+) / (subject.ratings.where(user_id: current_user.id).length * 5).to_f)).to_i
    else
      json.mastery 0
    end

    json.set! :followers do
      json.array! subject.followers do |follower|
        json.id follower.id
        json.username follower.username
        json.f_name follower.f_name
        json.l_name follower.l_name
        json.avatar follower.image.url
        json.fans follower.fans.count
        json.karma follower.karma
      end
    end

    json.made_by_current_user (current_user.id == subject.user_id)
    json.category subject.categories[0]
    json.card_count subject.cards.length
    json.deck_count subject.decks.length
  end
end

json.set! :categories do
  json.array! @categories do |category|
    json.extract! category, :id, :name
    json.set! :subjects_of_category do
      cat_subs_by_popularity = category.subjects.sort_by{|cs| cs.followers.count}.reverse.take(5)
      json.array! cat_subs_by_popularity do |cat_sub|
        json.extract! cat_sub, :id, :title, :user_id, :updated_at
        json.follow_count cat_sub.followers.count
        json.card_count cat_sub.cards.count
        if (current_user.id)
          #insurance for a strange bug that popped up
          json.made_by_current_user (current_user.id) == cat_sub.user_id
        else
          json.made_by_current_user false
        end
      end
    end
  end
end
