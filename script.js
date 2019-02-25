$(document).ready(initializeApp);

var student_array = [];

function initializeApp(){
      addClickHandlersToElements();
      getData();
}

function addClickHandlersToElements(){
      $('.add').on('click', handleAddClicked);
      $('.cancel').on('click', handleCancelClick);
      $('.getData').on('click', getData);
}

function handleAddClicked(){
      addStudent();
}

function handleCancelClick(){
      clearAddStudentFormInputs();
}

function addStudent(){
      var studentInfo = {
            name: $('#studentName').val(),
            course: $('#course').val(),
            grade: $('#studentGrade').val(),
      }      
      var newStudentObj = {
            url: "http://localhost/SGT/server/createstudent.php",
            dataType: 'json',
            method: 'post',
            data: {
                  api_key: 'E0aooQZMEC',
                  name: $('#studentName').val(),
                  course: $('#course').val(),
                  grade: $('#studentGrade').val(),
                  // 'force-failure': 'server'
            }
      }
      $.ajax(newStudentObj).then(function(response){
            debugger;
            if(response.success){
                  studentInfo.id = response.new_id
                  student_array.push(studentInfo);
                  clearAddStudentFormInputs();
                  updateStudentList(student_array);
            }else{
                  $('.modal-body > p').text('Error ' + response.errors);
                  $('#errorModal').modal();
                  console.log('Error');
            }
      }).fail(err =>{
            $('.modal-body > p').text('Error ' + err.status + err.statusText);
            $('#errorModal').modal();
      })
}

function clearAddStudentFormInputs(){
      $('input').val('');
      console.log('cleared');
}

function renderStudentOnDom(studentObj){
      var newRow = $('<tr>', {
            class: 'student-table-row'
      })
      var displayName = $('<td>',{
            text: studentObj.name,
            'class': 'col-xs-3'
      })
      var displayCourse = $('<td>',{
            text: studentObj.course,
            'class': 'col-xs-3'
      })
      var displayGrade = $('<td>',{
            text: studentObj.grade,
            'class': 'col-xs-3'
      })
      var deleteButton = $('<td>').addClass('col-xs-3').append($('<button>',{
            text: 'Delete',
            class: 'btn btn-danger',
            click: function(){
                  removeStudent(studentObj);
            }
             
      }))
      newRow.append(displayName, displayCourse, displayGrade, deleteButton);
      $('tbody').append(newRow);

}

function removeStudent(studentObj){
      debugger;
      var deleteStudent = {
            url: "http://localhost/SGT/server/deletestudent.php",
            dataType: 'json',
            method: 'post',
            data: {
                  api_key: 'E0aooQZMEC',
                  student_id: studentObj.id
            }
      }
      $.ajax(deleteStudent).then(function(){
            var studentIndex = student_array.indexOf(studentObj);
            student_array.splice(studentIndex, 1);
            $('.student-table-row').remove();
            updateStudentList(student_array);
            console.log(student_array);
      })
     
}

function updateStudentList(arrayOfStudents){
      $('.student-table-row').remove();
      for(studentIndex = 0; studentIndex < arrayOfStudents.length; studentIndex++){
            renderStudentOnDom(arrayOfStudents[studentIndex]);
      }
      calculateGradeAverage();
      renderGradeAverage();
}

function calculateGradeAverage(){
      var sum = 0
      for(studentIndex = 0; studentIndex < student_array.length; studentIndex++){
            sum += parseInt(student_array[studentIndex].grade);
      }
      var average = sum/student_array.length;
      return average;
}

function renderGradeAverage(){
      var result = calculateGradeAverage();
      console.log(result);
      if(isNaN(result)){
            $('.avgGrade').text('0');
      }else{
            $('.avgGrade').text(calculateGradeAverage);
      }
}

function getData(){
      var studentDataBase = {
            url: "http://localhost/SGT/server/getstudents.php",
            dataType: 'json',
            method: 'post',
            success: function(response){
                 var studentData =  response.data;
                 student_array = studentData;
                 updateStudentList(student_array);
                 console.log(response);
            },
            data: {
                  api_key: 'E0aooQZMEC'
            }
      }
      $.ajax(studentDataBase);
}


