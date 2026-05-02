<!doctype html>
<html>
<head>
    <title>Customer Records</title>
    <style>
        body { font-family: Arial; padding: 20px; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #333; padding: 8px; text-align: left; }
        th { background: #4CAF50; color: white; }
        tr:nth-child(even) { background: #f2f2f2; }
    </style>
</head>
<body>
<h2>All Customer Records</h2>
<a href="index.html">⬅ Back to Form</a><br><br>

<?php
$file = "customer.txt";
if (!file_exists($file) || filesize($file) == 0) {
    echo "<p>No records found.</p>";
} else {
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    echo "<table>";
    echo "<tr>
                <th>#</th><th>First Name</th><th>Last Name</th><th>Email</th>
                <th>Gender</th><th>Address</th><th>Country</th>
                <th>Skills</th><th>Department</th>
              </tr>";

    foreach ($lines as $index => $line) {
        $cols = explode("|", $line);
        $cols = array_pad($cols, 7, '');
        echo "<tr>";
        echo "<td>" . ($index + 1) . "</td>";
        foreach ($cols as $col) {
            echo "<td>" . $col . "</td>";
        }
        echo "</tr>";
    }
    echo "</table>";
}
?>
</body>
</html>