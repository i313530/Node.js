function loadSIs() {
  $.ajax('/api/Scopeitem', {
    success: function(SIs) {
      SIs.forEach(function(d) {
        appendScopeitem(d)
      })
    }
  })
}
function appendScopeitem(SI) {
  $('#ScopeitemList').append(createScopeitemLi(SI))
}
function createScopeitemLi(SI) {
  return $(`<li id="${SI.SI_SI_ID.trim()}">
    <span>${SI.SI_SI_ID} / ${SI.SI_CREATED_AT}</span>
    <input value="${SI.TXT_SI_NAME}">
    <span><button onclick="removeScopeitem('${SI.SI_SI_ID}')">Remove SI</button></span>
   </li>`)
}

function addSI() {
  var $SIidinput = $('#SIidInput')
  var $SInameInput = $('#SInameInput')
  $.ajax('/api/Scopeitem', {
    method: 'POST',
    data: {
      SI_ID: $SIidinput.val(),
      SI_NAME: $SInameInput.val()
    },
    success: function(SI) {
      appendScopeitem(SI)
      $SIidinput.val('')
      $SInameInput.val('')
    }
  })
}
function removeScopeitem(id) {
  $.ajax(`/api/Scopeitem/${id}`, {
    method: 'DELETE',
    success: function(resp) {
      removeScopeitemLi(id)
    }
  })
}

function removeScopeitemLi(SIId) {
  $(`#${SIId}`).remove()
}

loadSIs()
