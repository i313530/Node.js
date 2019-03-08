function loadFeedbacks() {
  $.ajax('/api/feedbacks', {
    success: function(feedbacks) {
      feedbacks.forEach(function(d) {
        appendFeedback(d)
      })
    }
  })
}
function appendFeedback(feedback) {
  $('#feedbackList').append(createFeedbackLi(feedback))
}
function createFeedbackLi(feedback) {
  return $(`<li id="${feedback.id}">
    <span>${feedback.createdAt}: ${feedback.text}</span>
    <span><button onclick="removeFeedback(${feedback.id})">Remove</button></span>
   </li>`)
}
function addFeedback() {
  var $feedbackInput = $('#feedbackInput')
  $.ajax('/api/feedbacks', {
    method: 'POST',
    data: {
      text: $feedbackInput.val()
    },
    success: function(feedback) {
      appendFeedback(feedback)
      $feedbackInput.val('')
    }
  })
}
function removeFeedback(id) {
  $.ajax(`/api/feedbacks/${id}`, {
    method: 'DELETE',
    success: function(resp) {
      removeFeedbackLi(id)
    }
  })
}

function removeFeedbackLi(feedbackId) {
  $(`#${feedbackId}`).remove()
}

loadFeedbacks()
