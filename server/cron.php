<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");

require_once('mysqlcredentials.php');

$student_id = intval( $POST['student_id']);

$query = "TRUNCATE TABLE 'sgt'";

$result = mysqli_query($db, $query);

if( $result ){
    if(mysqli_affected_rows($db) ===1) {
        $output['success'] = true;
    } else {
        $output['error'] = 'Could not delete student.';
    }
} else {
    $output['error'] = mysqli_error($db);
}

$json_output = json_encode($output);

print($json_output);

$query = "INSERT INTO `sgt` (`id`, `name`, `course`, `grade`) VALUES (NULL, 'Mary Shields', 'Javascript', '75'), (NULL, 'Federico Brown', 'Data Structures', '83'), (NULL, 'Frank Roye', 'Web Development 101', '94'), (NULL, 'Michelle Odom', 'Backend Architecture ', '87'), (NULL, 'Howard Allen', 'App Development', '97')";

$result = mysqli_query($db, $query);

if( $result ){
    if(mysqli_affected_rows($db) ===1) {
        $output['success'] = true;
    } else {
        $output['error'] = 'Could not delete student.';
    }
} else {
    $output['error'] = mysqli_error($db);
}

$json_output = json_encode($output);

print($json_output);


?>