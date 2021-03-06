subject_array = @subjects.to_a.sort_by{|e| e.title.downcase}

json.array! subject_array do |subject|
  json.extract! subject, :title, :user_id, :id
  if current_user
    json.made_by_current_user (current_user.id == subject.user_id)
  else
    json.made_by_current_user false
  end
  json.category subject.categories[0]
  json.updated_at subject.updated_at
  json.follow_count subject.followers.count
  json.card_count subject.cards.length
end
