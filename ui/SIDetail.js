// import { RecordOutput } from '../models/RecData'
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
    success: function (SI) {
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

function SaveRec() {

}
function loadfld() {
  $.ajax(`/api/Scopeitem/field/${ThisID}`, {
    method: 'GET',
    success: function (FLDs) {
      FLDs = _.sortBy(FLDs, ['DISPLAY_ORDER'])
      bufferFLDs = _.filter(FLDs, { VISIBILITY: true })
      FLDs.forEach(function (d) {
        displayField(d)
      })
      displayRecHead(bufferFLDs)
    }
  })
}

function newFLDline(FLD) {
  var t_PK_check = ''
  var t_FK_check = ''
  var t_radio_t = ''
  var t_radio_f = ''
  switch (FLD.TYPE) {
    case 'P ':
      t_PK_check = 'checked'
      break
    case 'F ':
      t_FK_check = 'checked'
      break
    case 'PF':
      t_PK_check = 'checked'
      t_FK_check = 'checked'
      break
  }
  switch (FLD.VISIBILITY) {
    case true:
      t_radio_t = 'checked'
      break
    case false:
      t_radio_f = 'checked'
      break
    case 'null':
      break
  }
  return $(`<tr id="FLD_${FLD.FIELD}">
  <td><button onclick="updateFLD('${FLD.FIELD}')">Update</button><br>
  <button onclick="deleteFLD('${FLD.FIELD}')">Delete</button></td>
  <td>${FLD.FIELD}</td>
  <td><input type="checkbox" id="FLD_${FLD.FIELD}_PK" ${t_PK_check}>Primary Key<br>
  <input type="checkbox" id="FLD_${FLD.FIELD}_FK" ${t_FK_check}>Foreign Key</td>
  <td><input type="text" id="FLD_${FLD.FIELD}_Alias" value="${FLD.ALIAS}"></td>
  <td><input type="radio" name="${FLD.FIELD}_VISIBILITY" value="true" ${t_radio_t}>Display<br>
  <input type="radio" name="${FLD.FIELD}_VISIBILITY" value="false" ${t_radio_f}>Hide</td>
  <td><input type="text" id="FLD_${FLD.FIELD}_ORDER" value="${FLD.DISPLAY_ORDER}"></td>
  </tr>`)
}

function updateFLD(fldid) {
  var fldType = ''
  if ($(`input[id='FLD_${fldid}_PK']`).prop('checked')) {
    fldType = 'P'
  }
  if ($(`input[id='FLD_${fldid}_FK']`).prop('checked')) {
    fldType = fldType + 'F'
  }

  $.ajax(`/api/Scopeitem/field`, {
    method: 'PUT',
    data: {
      SI_ID: ThisID,
      FIELD: fldid,
      DISPLAY_ORDER: $(`input[id='FLD_${fldid}_ORDER']`).val(),
      ALIAS: $(`input[id='FLD_${fldid}_Alias']`).val(),
      VISIBILITY: $(`input[name="${fldid}_VISIBILITY"]:checked`).val(),
      TYPE: fldType
    },
    success: function () {
      alert('Update field Succeed!')
      // resetLastChange()
    },
    error: function () {
      alert('Update field failed!')
    }
  })
}
function AddField() {
  var FLDID = $('#FLDidInput').val()
  $.ajax(`/api/Scopeitem/field/${ThisID}/${FLDID}`, {
    method: 'POST',
    success: function (FLD) {
      displayField(FLD)
      resetLastChange()
      $('#FLDidInput').val('')
    },
    error: function () {
      alert('Add field failed!')
    }
  })
}
function deleteFLD(FLDid) {

}

function displayRecHead(FLDs) {
  // var tablehead = eachHead(FLDs)
  var thead = '<tr>' + eachHead(FLDs) + '</tr>'
  $('#Records').append(thead)
}

function eachHead(FLDs) {
  var output = ''
  FLDs.forEach(function (d) {
    if (d.ALIAS.trim() == '') {
      d.ALIAS = d.FIELD
    }
    output = output + `<th>${d.ALIAS}</th>`
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
    success: function (Recs) {
      displayRecs(Recs)
    }
  })
}
function displayRecs(Recs) {

  Recs.forEach(function (rec) {
    addRecline(rec)
  })
}
function addRecline(rec) {
  $.ajax(`/api/records/${rec.REC_ID}`, {
    method: 'GET',
    success: function (Recdata) {
      var tdline = `<tr id="REC_${rec.REC_ID}">`
      var cells = Recdata.cells
      bufferFLDs.forEach(function (FLD) {
        var recline = _.find(cells, { 'FLD_ID': FLD.FIELD })
        if (recline === undefined) {
          tdline = tdline + `<td><input type="text" id="REC_${rec.REC_ID}_${FLD.FIELD}" class="CellValue" value=""></td>`
        } else {
          tdline = tdline + `<td><input type="text" id="REC_${rec.REC_ID}_${FLD.FIELD}" class="CellValue" value="${recline.VALUE}"></td>`
        }
      })
      tdline = tdline + '</tr>'
      $('#Records').append($(tdline))
    }
  })
}

function AddinitRec() {
  $.ajax(`/api/Scopeitem/record/${ThisID}`, {
    method: 'POST',
    success: function (Rec) {
      addRecline(Rec)
    }
  })
}

function SaveRec() {
  var recdata = []
  var tdlines = $('.CellValue')
  var i = 0
  _.forEach(tdlines, function (td) {
    var tdidA = td.id.split('_')
    var recid = tdidA[1]
    var fldid = tdidA[2]
    var recindex = _.findIndex(recdata, { 'REC_ID': recid })
    if (recindex === -1) {
      recdata[i] = {}
      recdata[i].REC_ID = recid
      recdata[i].cells = [{ FLD_ID: fldid, VALUE: td.value }]
      i++
    } else {
      recdata[recindex].cells = _.union(recdata[recindex].cells, [{ FLD_ID: fldid, VALUE: td.value }])
    }
  })
  $.ajax(`/api/records/${ThisID}`, {
    method: 'PUT',
    data: {
      RECs: recdata
    },
    success: function () { alert('Succeed') },
    error: function () { alert('Failed') }
  })

  // Promise.all(arr)
  // .then(function () {alert('ok') })
  // .catch(function () { alert('error')})

}

// setdata = async (rec) => {
//   $.ajax(`/api/records/${id}`, {
//     method: 'PUT',
//     data: {
//       RECs: recdata
//     },
//   })
// }