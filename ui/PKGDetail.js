var ThisID

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
        appendAssigns(d)
      })
    }
  })
  $.ajax(`/api/unassignSI/${id}`, {
    method: 'GET',
    success: function(SIs) {
      SIs.forEach(function(d) {
        appendUnassigns(d)
      })
    }
  })
}
function appendUnassigns(SIs) {
  $('#SIList').append(createUnassignLi(SIs))
}
function createUnassignLi(SIs) {
  return $(`<li id="${SIs.SI_ID}">
    <span>${SIs.SI_ID}</span>
    <span><button onclick="addAssign('${SIs.SI_ID}')">Assign to ${ThisID}</button></span>
   </li>`)
}
function addAssign(SI_ID) {
  $.ajax(`/api/pkgsiA/${ThisID}/${SI_ID}`, {
    method: 'POST',
    success: function(SI_ID) {
      removeUnassignLi(SI_ID)
      // appendAssigns(d)
    }
  })
}
function appendAssigns(SIs) {
  $('#Assignments').append(createAssignLi(SIs))
}
function createAssignLi(SIs) {
  return $(`<li id="${SIs.SI_SI_ID}">
    <span>${SIs.SI_SI_ID} / ${SIs.TXT_SI_NAME}</span>
    <span><button onclick="removeAssign('${SIs.SI_SI_ID}')">Remove Assignment</button></span>
   </li>`)
}
function removeAssign(id) {
  $.ajax(`/api/pkgsiA/${ThisID}/${id}`, {
    method: 'DELETE',
    success: function(resp) {
      removeAssignLi(id)
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
