$(document).ready(initializeApp);

var student_array = [];

function initializeApp(){
      addClickHandlersToElements();
      getData();
      addInputValidation();
}

function addClickHandlersToElements(){
      $('.add').on('click', handleAddClicked);
      $('.cancel').on('click', handleCancelClick);
      $('.getData').on('click', getData);
      $('.editButton').on('click', showEditModal);
      $('.clear').on('click', clearEditStudentFormInputs)
}

function showEditModal(){
      // console.log('made it here')
      clearAddStudentFormInputs();
      $('#editModal').on('hidden.bs.modal', function(){
            $(this).find('form')[0].reset();
        });
      $('#editModal').modal();
}

function handleAddClicked(){
      addStudent();
}

function handleCancelClick(){
      clearAddStudentFormInputs();
}

function addInputValidation(){
      console.log('added onchange to input validation')
      $('#studentName').change(function(){
            validateName($(this).val());
      });
      $('#course').change(function(){
            validateCourse($(this).val());
      });
      $('#studentGrade').change(function(){
            validateGrade($(this).val());
      });
      $('#editName').change(function(){
            validateEditName($(this).val());
      });
      $('#editCourse').change(function(){
            validateEditCourse($(this).val());
      });
      $('#editGrade').change(function(){
            validateEditGrade($(this).val());
      });
}

function validateName(input){
      // /^[a-z ,.'-]+$/i for names
      var namePattern = /^[a-z ,.'-]+$/i
      if(namePattern.test(input)){
            // console.log('valid name');
            $('.nameInput').removeClass('has-error');
            $('.nameError').remove();
            $('.nameInput').addClass('has-success')
      }else if(input){
            $('.nameInput').removeClass('has-success');
            $('.nameInput').addClass('has-error');
            $('.nameInput').after('<span class="help-block nameError" id="helpBlock2">Invalid Name</span>')
            // console.log('invalid name');
      }
}

function validateEditName(input){
      // /^[a-z ,.'-]+$/i for names
      var namePattern = /^[a-z ,.'-]+$/i
      if(namePattern.test(input)){
            // console.log('valid name');
            $('.editNameInput').removeClass('has-error');
            $('.editNameError').remove();
            $('.editNameInput').addClass('has-success')
      }else if(input){
            $('.editNameInput').removeClass('has-success');
            $('.editNameInput').addClass('has-error');
            $('.editNameInput').after('<span class="help-block editNameError" id="helpBlock2">Invalid Name</span>')
            // console.log('invalid name');
      }
}

function validateCourse(input){
      var coursePattern = /^[A-Za-z0-9\s]{2,30}$/i
      if(coursePattern.test(input)){
            $('.courseInput').removeClass('has-error');
            $('.courseError').remove();
            $('.courseInput').addClass('has-success');
            // console.log('valid course');
      }else if(input){
            $('.courseInput').removeClass('has-success');
            $('.courseInput').addClass('has-error');
            $('.courseInput').after('<span class="help-block courseError" id="helpBlock2">Invalid Course Name</span>')
            // console.log('invalid course');
      }
}

function validateEditCourse(input){
      var coursePattern = /^[A-Za-z0-9]{2,30}$/i
      if(coursePattern.test(input)){
            $('.editCourseInput').removeClass('has-error');
            $('.editCourseError').remove();
            $('.editCourseInput').addClass('has-success');
            // console.log('valid course');
      }else if(input){
            $('.editCourseInput').removeClass('has-success');
            $('.editCourseInput').addClass('has-error');
            $('.editCourseInput').after('<span class="help-block editCourseError" id="helpBlock2">Invalid Course Name</span>')
            // console.log('invalid course');
      }
}

function validateGrade(input){
      if($.isNumeric(input) && input.length < 6 && input >= 0 && input <=100){
            $('.gradeInput').removeClass('has-error');
            $('.gradeError').remove();
            $('.gradeInput').addClass('has-success');
            // console.log('valid grade');

      }else if(input){
            $('.gradeInput').removeClass('has-success');
            $('.gradeInput').addClass('has-error');
            $('.gradeInput').after('<span class="help-block gradeError" id="helpBlock2">Invalid Grade</span>')
            // console.log('please enter a valid grade');
      }
}

function validateEditGrade(input){
      if($.isNumeric(input) && input.length < 6 && input >= 0 && input <=100){
            $('.editGradeInput').removeClass('has-error');
            $('.editGradeError').remove();
            $('.editGradeInput').addClass('has-success');
            // console.log('valid grade');

      }else if(input){
            $('.editGradeInput').removeClass('has-success');
            $('.editGradeInput').addClass('has-error');
            $('.editGradeInput').after('<span class="help-block editGradeError" id="helpBlock2">Invalid Grade</span>')
            // console.log('please enter a valid grade');
      }
}

function addStudent(){
      var studentInfo = {
            name: $('#studentName').val(),
            course: $('#course').val(),
            grade: $('#studentGrade').val(),
      }      
      var newStudentObj = {
            url: "http://localhost:8888/SGT/server/createstudent.php",
            dataType: 'json',
            method: 'post',
            data: {
                  // api_key: 'E0aooQZMEC',
                  name: $('#studentName').val(),
                  course: $('#course').val(),
                  grade: $('#studentGrade').val(),
                  // 'force-failure': 'server'
            }
      }
      $.ajax(newStudentObj).then(function(response){
            // debugger;
            if(response.success){
                  studentInfo.id = response.new_id
                  student_array.push(studentInfo);
                  clearAddStudentFormInputs();
                  updateStudentList(student_array);
            }else{
                  $('.modal-body > p').text('Error ' + response.errors);
                  $('#errorModal').modal();
                  console.log('Error', response.errors);
            }
      }).fail(err =>{
            $('.modal-body > p').text('Error ' + err.status + err.statusText);
            $('#errorModal').modal();
      })
}

function clearAddStudentFormInputs(){
      $('.student-add-form input').val('')
      $('.form-group').removeClass('has-success has-error');
      $('span#helpBlock2').remove();
      console.log('cleared');
}

function clearEditStudentFormInputs(){
      $('#editModal input').val('');
}

function renderStudentOnDom(studentObj, index){
      var newRow = $('<tr>', {
            class: `student-table-row student-${index}`
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
      var deleteButton = $('<td>').addClass('col-xs-3 operations').append($('<button>',{
            text: 'Delete',
            class: 'btn btn-danger',
            click: function(){
                  removeStudent(studentObj);
            }
      }));
      var editButton = $('<button>',{
            text: 'Edit',
            class: 'btn btn-primary',
            click: function(){
                  // updateStudent(studentObj);
                  showEditModal();
            }
      });

      // var nameInput = $('<input/>', {
      //       class: 'form-control',
      //       type: 'text',
      //       id: 'editName',
      // })
      // $('.nameInput').append(nameInput)
      deleteButton.append(editButton)
      newRow.append(displayName, displayCourse, displayGrade, deleteButton);
      $('tbody').append(newRow);

}

// function updateStudent(studentObj){
//       var updateStudent = {
//             url: "http://localhost:8888/SGT/server/updatestudent.php",
//             datatype: 'json',
//             method: 'post',
//             data: {student_id: studentObj.id}
//       }
//       $.ajax(updateStudent).then(function(){
//             var studentIndex = student_array.indexOf(studentObj);

//             updateStudentList(student_array)
//       })
// }

function removeStudent(studentObj){
      // debugger;
      var deleteStudent = {
            url: "http://localhost:8888/SGT/server/deletestudent.php",
            dataType: 'json',
            method: 'post',
            data: {
                  student_id: studentObj.id
            }
      }
      $.ajax(deleteStudent).then(function(){
            var studentIndex = student_array.indexOf(studentObj);
            student_array.splice(studentIndex, 1);
            $('.student-table-row').remove();
            updateStudentList(student_array);
            getData();
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
            url: "http://localhost:8888/SGT/server/getstudents.php",
            dataType: 'json',
            method: 'get',
            success: function(response){
                 var studentData =  response.data;
                 student_array = studentData;
                 updateStudentList(student_array);
                 console.log(response);
            },
            data: {
                  // api_key: 'E0aooQZMEC'
            }
      }
      $.ajax(studentDataBase);
}


