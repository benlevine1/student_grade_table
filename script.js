$(document).ready(initializeApp);

var student_array = [];

function initializeApp(){
      addClickHandlersToElements();
      getData();
      addInputValidation();
}

function addClickHandlersToElements(){
      $('.add').on('click', confirmModal);
      $('#confirm').on('click', handleConfirmClicked);
      $('.save').on('click', handleSaveClicked);
      $('#confirmDelete').on('click', handleConfirmDeleteClicked)
      $('.cancel').on('click', handleCancelClick);
      $('.getData').on('click', getData);
      $('.clear').on('click', clearEditStudentFormInputs);
}

function showEditModal(studentObj){
      $('.form-group').removeClass('has-error has-success');
      $('span#helpBlock2').remove();
      $('#editName').val(studentObj.name);
      $('#editCourse').val(studentObj.course);
      $('#editGrade').val(studentObj.grade);
      $('.save').attr('data-id', studentObj.id);
      $('#editModal').modal();
}

function showDeleteModal(id){
      $('#confirmDelete').attr('data-id', id)
      $('#deleteModal').modal();
}

function handleConfirmClicked(){
      addStudent();
      clearAddStudentFormInputs();
}

function handleConfirmDeleteClicked(){
     var id = $(this).attr('data-id');
     removeStudent(id);
}

function handleSaveClicked(){
      var id = $(this).attr('data-id');
      var name = $('#editName').val();
      var course = $('#editCourse').val();
      var grade = $('#editGrade').val();
      editStudent(id, name, course, grade);
}

function handleCancelClick(){
      clearAddStudentFormInputs();
}

function addInputValidation(){
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
      var namePattern = /^[a-z ,.'-]+$/i
      if(namePattern.test(input)){
            $('.nameInput').removeClass('has-error');
            $('.nameError').remove();
            $('.nameInput').addClass('has-success')
      }else if(input){
            $('.nameInput').removeClass('has-success');
            $('.nameInput').addClass('has-error');
            $('.nameError').remove();
            $('.nameInput').after('<span class="help-block nameError" id="helpBlock2">Invalid Name</span>')
      }
}

function validateEditName(input){
      var namePattern = /^[a-z ,.'-]+$/i
      if(namePattern.test(input)){
            $('.editNameInput').removeClass('has-error');
            $('.editNameError').remove();
            $('.editNameInput').addClass('has-success')
      }else if(input){
            $('.editNameInput').removeClass('has-success');
            $('.editNameInput').addClass('has-error');
            $('.editNameError').remove();
            $('.editNameInput').after('<span class="help-block editNameError" id="helpBlock2">Invalid Name</span>')
      }
}

function validateCourse(input){
      var coursePattern = /^[A-Za-z0-9\s]{2,50}$/i
      if(coursePattern.test(input)){
            $('.courseInput').removeClass('has-error');
            $('.courseError').remove();
            $('.courseInput').addClass('has-success');
      }else if(input){
            $('.courseInput').removeClass('has-success');
            $('.courseInput').addClass('has-error');
            $('.courseError').remove();
            $('.courseInput').after('<span class="help-block courseError" id="helpBlock2">Invalid Course Name</span>')
      }
}

function validateEditCourse(input){
      var coursePattern = /^[A-Za-z0-9]{2,30}$/i
      if(coursePattern.test(input)){
            $('.editCourseInput').removeClass('has-error');
            $('.editCourseError').remove();
            $('.editCourseInput').addClass('has-success');
      }else if(input){
            $('.editCourseInput').removeClass('has-success');
            $('.editCourseInput').addClass('has-error');
            $('.editCourseError').remove();
            $('.editCourseInput').after('<span class="help-block editCourseError" id="helpBlock2">Invalid Course Name</span>')
      }
}

function validateGrade(input){
      if($.isNumeric(input) && input.length < 6 && input >= 0 && input <=100){
            $('.gradeInput').removeClass('has-error');
            $('.gradeError').remove();
            $('.gradeInput').addClass('has-success');
      }else if(input){
            $('.gradeInput').removeClass('has-success');
            $('.gradeInput').addClass('has-error');
            $('.gradeError').remove();
            $('.gradeInput').after('<span class="help-block gradeError" id="helpBlock2">Invalid Grade</span>')
      }
}

function validateEditGrade(input){
      if($.isNumeric(input) && input.length < 6 && input >= 0 && input <=100){
            $('.editGradeInput').removeClass('has-error');
            $('.editGradeError').remove();
            $('.editGradeInput').addClass('has-success');
      }else if(input){
            $('.editGradeInput').removeClass('has-success');
            $('.editGradeInput').addClass('has-error');
            $('.editGradeError').remove();
            $('.editGradeInput').after('<span class="help-block editGradeError" id="helpBlock2">Invalid Grade</span>')
      }
}

function confirmModal(){
      $('.confirm-name-text').text($('#studentName').val());
      $('.confirm-course-text').text($('#course').val());
      $('.confirm-grade-text').text($('#studentGrade').val());
      $('#confirmModal').modal()
}

function addStudent(){
      var studentInfo = {
            name: $('#studentName').val(),
            course: $('#course').val(),
            grade: $('#studentGrade').val(),
      }      
      var newStudentObj = {
            url: "server/createstudent.php",
            dataType: 'json',
            method: 'post',
            data: {
                  name: $('#studentName').val(),
                  course: $('#course').val(),
                  grade: $('#studentGrade').val(),
            }
      }
      $.ajax(newStudentObj).then(function(response){
            if(response.success){
                  studentInfo.id = response.new_id
                  student_array.push(studentInfo);
                  clearAddStudentFormInputs();
                  updateStudentList(student_array);
            }else{
                  $('.modal-body > p').text('Error adding entry');
                  $('#errorModal').modal();
            }
      }).fail(err =>{
            $('.modal-body > p').text('Error while loading data, check your internet connection and try again.');
            $('#errorModal').modal();
      })
}

function editStudent(id, name, course, grade){
      var editStudentObj ={
            url: "server/updatestudent.php",
            dataType: 'json',
            method: 'post',
            data: {
                  id,
                  name,
                  course,
                  grade,
            }
      }
      $.ajax(editStudentObj).then(function(response){
            if(response.success){
                  getData();
                  $('#editModal').modal('hide');

            }else{
                  $('.modal-body > p').text('Error editing entry.');
                  $('#errorModal').modal();
            }
      })
}

function clearAddStudentFormInputs(){
      $('.student-add-form input').val('')
      $('.form-group').removeClass('has-success has-error');
      $('span#helpBlock2').remove();
}

function clearEditStudentFormInputs(){
      $('#editModal input').val('');
}

function renderStudentOnDom(studentObj){
      if (!studentObj){
            var noData = $('<h1>', {
                  text: 'There is currently no student data to display, please add a student.'
            })
            $('tbody').append(noData);
      }
      var newRow = $('<tr>', {
            class: `student-table-row`,
            'data-id': studentObj.id
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
            'data-id': studentObj.id,
            click: function(){
                  showDeleteModal(studentObj.id);
            }
      }));
      var editButton = $('<button>',{
            text: 'Edit',
            class: 'btn btn-primary',
            'data-id': studentObj.id,
            click: function(){
                  showEditModal(studentObj);
            }
      });
      deleteButton.append(editButton)
      newRow.append(displayName, displayCourse, displayGrade, deleteButton);
      $('tbody').append(newRow);

}


function removeStudent(student_id){
      var deleteStudent = {
            url: "server/deletestudent.php",
            dataType: 'json',
            method: 'post',
            data: {
                  student_id
            }
      }
      $.ajax(deleteStudent).then(function(response){
            if(response.success){
                  getData();
                  updateStudentList(student_array);
            }else{
                  $('.modal-body > p').text('Error removing student.');
                  $('#errorModal').modal();
            }
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
      if(isNaN(result)){
            $('.avgGrade').text('0');
      }else{
            $('.avgGrade').text(calculateGradeAverage);
      }
}

function getData(){
      var studentDataBase = {
            url: "server/getstudents.php",
            dataType: 'json',
            method: 'get',
            success: function(response){
                 var studentData =  response.data;
                 student_array = studentData;
                 updateStudentList(student_array);
            }
      }
      $.ajax(studentDataBase);
}


