var ThisID
var Langu
var DD07L

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

function loadPackage() {
  var id = getUrlParam('id')
  ThisID = id
  Langu = navigator.language
  $.ajax('/api/domain/', {
    method: 'GET',
    success: function(DD07) {
      DD07L = DD07
    }
  })
  $.ajax(`/api/packages/${id}`, {
    method: 'GET',
    success: function(package) {
      appendPackage(package)
      // $('#OutOfScope').val(package.PKG_OutOfScope)
      fulfillselect(package.PKG_COMPLETION)
      bindClickradio()
    }
  })
  $.ajax(`/api/pkgsiA/${id}`, {
    method: 'GET',
    success: function(Assignments) {
      Assignments.forEach(function(d) {
        appendAssign(d)
      })
    }
  })
  $.ajax(`/api/unassignSI/${id}`, {
    method: 'GET',
    success: function(SIs) {
      SIs.forEach(function(d) {
        appendUnassigns(d.SI_ID)
      })
    }
  })
}
function appendUnassigns(SIID) {
  $('#SIList').append(createUnassignLi(SIID))
}
function createUnassignLi(SIID) {
  return $(`<li id="${SIID.trim()}">
    <span>${SIID}</span>
    <span><button onclick="addAssign('${SIID}')">Assign to ${ThisID}</button></span>
   </li>`)
}
function addAssign(SI_ID) {
  $.ajax(`/api/pkgsiA/${ThisID}/${SI_ID}`, {
    method: 'POST',
    success: function(SI) {
      removeUnassignLi(SI.SI_ID)
      addAssignLi(SI.SI_ID)
      resetLastChange()
    }
  })
}
function addAssignLi(ID) {
  $.ajax(`/api/Scopeitem/${ID}`, {
    method: 'GET',
    success: function(SIs) {
      SIs.forEach(function(d) {
        appendSI2Assign(d)
      })
    }
  })
}
function appendSI2Assign(SI) {
  $('#Assignments').append(createAssignSILi(SI))
}
function createAssignSILi(SI) {
  return $(`<li id="${SI.SI_SI_ID.trim()}">
    <span>${SI.SI_SI_ID} / ${SI.TXT_SI_NAME}</span>
    <span><button onclick="removeAssign('${SI.SI_SI_ID}')">Remove from ${ThisID}</button></span>
   </li>`)
}
function removeUnassignLi(SI_ID) {
  $(`#${SI_ID}`).remove()
}
function appendAssign(SI) {
  $('#Assignments').append(createAssignLi(SI))
}
function createAssignLi(SI) {
  return $(`<li id="${SI.AG_SI_ID.trim()}">
    <span>${SI.AG_SI_ID} / ${SI.TXT_SI_NAME}</span>
    <span><button onclick="removeAssign('${SI.AG_SI_ID}')">Remove from ${ThisID}</button></span>
   </li>`)
}
function removeAssign(id) {
  $.ajax(`/api/pkgsiA/${ThisID}/${id}`, {
    method: 'DELETE',
    success: function(resp) {
      removeAssignLi(id)
      appendUnassigns(id)
      resetLastChange()
    }
  })
}

function removeAssignLi(id) {
  $(`#${id}`).remove()
}
function appendPackage(Package) {
  return $('#PackageHeader').append(appendDetail(Package))
}
function callScreen() {
  $('#NewSI').show()
}
function closeSI() {
  $('#NewSI').hide()
}
function createNewSI() {
  var $SIidinput = $('#SIidInput')
  var $SInameInput = $('#SInameInput')
  $.ajax('/api/Scopeitem', {
    method: 'POST',
    data: {
      SI_ID: $SIidinput.val(),
      SI_NAME: $SInameInput.val()
    },
    success: function(SI) {
      addAssign(SI.SI_SI_ID)
      $('#NewSI').hide()
      resetLastChange()
    }
  })
}
function appendDetail(Package) {
  var t_scope = Package.PKG_OutOfScope ? 'checked' : ''
  switch (Package.PKG_Type) {
    case 'C':
      var t_radio_c = 'checked'
      break
    case 'T':
      var t_radio_t = 'checked'
      break
    case '':
      break
  }
  return $(`<div>
    <text>Package ID: ${Package.PKG_PKG_ID}</text> 
    </p>
    <text>Package Name:</text>
    <input type="text" id="PkgnameInput" value = ${Package.TXT_PKG_NAME}>
    <button onclick="renamePackage()">Rename PKG</button> 
    </p>
    <text>Completion Status: </text>
    <select id="CompSel" onchange="addSavebutton()"></select>   
    </p>
    <input type="checkbox" id="OutOfScope" onclick="addSavebutton()" ${t_scope}>Out of Scope <br>
    <text>Type</text>   <br>
    <input type="radio" name="PKGType" value="T" ${t_radio_t}>Technical<br>
    <input type="radio" name="PKGType" value="C" ${t_radio_c}>Conceptual</p>
    <text>Created at: ${Package.PKG_CREATED_AT}</text>   
    </p>
    <text id="Last">Last changed at: ${Package.PKG_CHANGED_AT}</text>       
    </div>`)
}
function addSavebutton() {
  var savebotton = document.getElementById('SaveBotton')
  if (savebotton == null) {
    return $('#PackageHeader').append(`<button id="SaveBotton" onclick="SavePackage()">Save</button>`)
  } else {
    $('#SaveBotton').show()
  }
}
function SavePackage() {
  $.ajax(`/api/packages/`, {
    method: 'MERGE',
    data: {
      PKG_ID: ThisID,
      COMPLETION: $('#CompSel').val(),
      OutOfScope: $('#OutOfScope').prop('checked'),
      Type: $('input[name="PKGType"]:checked').val()
    },
    success: function() {
      alert('succeed!')
      resetLastChange()
      $('#SaveBotton').hide()
    },
    error: function() {
      alert('Failed!')
    }
  })
}

function renamePackage() {
  var name = $('#PkgnameInput').val()
  $.ajax(`/api/packages/${ThisID}/${name}`, {
    method: 'PUT',
    data: {
      LANGU: Langu,
      PKG_NAME: $PkgnameInput.val()
    },
    success: function() {
      alert('succeed!')
      resetLastChange()
    },
    error: function() {
      alert('Failed!')
    }
  })
}
function resetLastChange() {
  // return ThisPKG.PKG_CHANGED_AT = new Date().toTimeString()
  var ts = new Date().toLocaleString()
  $('#Last')[0].innerHTML = 'Last changed at: ' + ts
}

function fulfillselect(COMPLETION) {
  // $('#CompSel').append(`<option value =''> </option>`)
  _.forEach(DD07L, function(DD07) {
    if (DD07.Name == 'Completion') {
      $('#CompSel').append(`<option value ='${DD07.Key}'>${DD07.Value}</option>`)
    }
  })
  if (COMPLETION == null) {
    $('#CompSel').val('P')
    // $('#CompSel').val = attr('value', 'P')
    // $('#CompSel').attr('text', 'In preparation')
  } else {
    $('#CompSel').val(COMPLETION)
  }
}
function bindClickradio() {
  $('input[name="PKGType"]').on('click change', function() {
    addSavebutton()
  })
}

loadPackage()
