var ThisID
var FLDs
loadSI()
loadfld()
loadRec()

function loadSI() {
  var id = getUrlParam('id')
  ThisID = id
  $.ajax(`/api/Scopeitem/${id}`, {
    method: 'GET',
    success: function(SI) {
      displayhead(SI)
    }
  })
}

function getUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  // var rg = window.location.search.substr(1)
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  } else {
    return null
  }
}
function displayhead(SI) {
  $('#SI_ID').text(SI.SI_SI_ID)
  $('#SInameInput').val(SI.TXT_SI_NAME)
  $('#SI_CREATED').text(SI.SI_CREATED_AT)
  $('#SI_CHANGED').text(SI.SI_CHANGED_AT)
}

function loadfld() {
  $.ajax(`/api/Scopeitem/field/${id}`, {
    method: 'GET',
    success: function(FLD) {
      displayFields(FLD)
    }
  })
}
function displayFields(FLD) {
  $('#Fields').append()
}
