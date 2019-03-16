var ThisID
var Langu

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
  $.ajax(`/api/packages/${id}`, {
    method: 'GET',
    success: function(package) {
      appendPackage(package)
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
    }
  })
}
function addAssignLi(ID) {
  $.ajax(`/api/Scopeitem/${ID}`, {
    method:'GET',
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
    }
  })
}

function removeAssignLi(id) {
  $(`#${id}`).remove()
}
function appendPackage(Package) {
  return $('#PackageHeader').append(appendDetail(Package))
}

function appendDetail(Package) {
  return $(`<div>
    <text>Package ID: ${Package.PKG_PKG_ID}</text> 
    </p>
    <text>Package Name:</text>
    <input type="text" id="PkgnameInput" value = ${Package.TXT_PKG_NAME}>
    <button onclick="renamePackage()">Rename PKG</button> 
    </p>
    <text>Created at: ${Package.PKG_CREATED_AT}</text>   
    </p>
    <text id="Last">Last changed at: ${Package.PKG_CHANGED_AT}</text>       
    </div>`)
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

loadPackage()
