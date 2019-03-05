<?php

require_once('mysqlcredentials.php');

$output = [
  'success'=>false,
  'error'=>[]
];


foreach( $_POST as $key=>$value){
  $_POST[$key] = addslashes($value);
}

if(strlen($_POST['name']) < 2){
  $output['error'][] = 'name must be at least 2 characters long';
}

if(strlen($_POST['course']) < 2){
  $output['error'][] = 'course must be at least 2 characters long';
}

if(!is_numeric($_POST['grade'])){
  $output['error'][] = 'grade must be a numeric value';
}else{
  $grade = intval($_POST['grade']);
  if($grade>100 || $grade<0){
    $output['error'][] = 'grade must be greater than or equal to 0 and less than or equal to 100';
  }
}

if(!empty( $output['error'])){
  print(json_encode( $output));
  exit();
}

$query = "UPDATE `sgt` SET `name` = '{$_POST['name']}', `course`='{$_POST['course']}', `grade`={$_POST['grade']} WHERE `id` = {$_POST['id']}";

$result = mysqli_query( $db, $query );

if($result){
  $output['success']=true;
} else {
  print(mysqli_error($db));
  $output['error'] = mysqli_error($db);
}

$json_output = json_encode( $output);

print $json_output;

?>