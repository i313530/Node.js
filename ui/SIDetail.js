var ThisID
var bufferFLDs
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
  $.ajax(`/api/Scopeitem/field/${ThisID}`, {
    method: 'GET',
    success: function(FLDs) {
      _.sortBy(FLDs, DISPLAY_ORDER)
      bufferFLDs = FLDs
      FLDs.forEach(function(d) {
        displayField(d)
      })
      displayRecHead(FLDs)
    }
  })
}

function newFLDline(FLD) {
  var t_PK_check = ''
  var t_FK_check = ''
  switch (FLD.TYPE) {
    case 'P':
      t_PK_check = 'checked'
      break
    case 'F':
      t_FK_check = 'checked'
      break
    case 'A':
      t_PK_check = 'checked'
      t_FK_check = 'checked'
      break
  }

  return $(`<tr id="FLD_${FLD.FIELD}">
  <td><button onclick="updateFLD('${FLD.FIELD}')">Update</button><br>
  <button onclick="deleteFLD('${FLD.FIELD}')">Delete</button></td>
  <td>${FLD.FIELD}</td>
  <td><input type="checkbox" id="FLD_${FLD.FIELD}_PK" ${t_PK_check}>Primary Key<br>
  <input type="checkbox" id="FLD_${FLD.FIELD}_PK" ${t_FK_check}>Foreign Key</td>
  <td><input type="text" id="FLD_${FLD.FIELD}_Alias" value="${FLD.ALIAS}"></td>
  <td><input type="text" id="FLD_${FLD.FIELD}_VISIBILITY" value="${FLD.VISIBILITY}"></td>
  <td><input type="text" id="FLD_${FLD.FIELD}_ORDER" value="${FLD.DISPLAY_ORDER}"></td>
  </tr>`)
}

function updateFLD(fldid) {}
function AddField() {
  var FLDID = $('#FLDidInput').val()
  $.ajax(`/api/Scopeitem/field/${ThisID}/${FLDID}`, {
    method: 'POST',
    success: function(FLD) {
      displayField(FLD)
      resetLastChange()
      $('#FLDidInput').val('')
    },
    error: function() {
      alert('Add field failed!')
    }
  })
}

function displayRecHead(FLDs) {
  // var tablehead = eachHead(FLDs)
  var thead = '<tr>' + eachHead(FLDs) + '</tr>'
  $('#Records').append(thead)
}
function eachHead(FLDs) {
  var output = ''
  FLDs.forEach(function(d) {
    output = output + `<th>${d.FIELD}</th>`
  })
  return output
}

function displayField(FLD) {
  $('#Fields').append(newFLDline(FLD))
}

function resetLastChange() {
  var ts = new Date().toLocaleString()
  $('#SI_CHANGED').text(ts)
}
function loadRec() {
  $.ajax(`/api/Scopeitem/record/${ThisID}`, {
    method: 'GET',
    success: function(Recs) {
      displayRecs(Recs)
    }
  })
}
function displayRecs(Recs) {
  Recs.forEach(function(rec) {
    $('#Records').append(addRecline(rec))
  })
}
function addRecline(rec) {
  $.ajax(`/api/records/${id}`, {
    method: 'GET',
    success: function(Recdata) {
      bufferFLDs.forEach()
    }
  })
}

function AddinitRec() {
  $.ajax(`/api/Scopeitem/record/${ThisID}`, {
    method: 'POST',
    success: function(Rec) {
      addRecline(Rec)
    }
  })
}
