

<?PHP
echo "Vitaj $meno!";
// odstránime všetky HTML a PHP značky
$nazor = strip_tags($nazor);
// odstránime netlačiteľné znaky zo začiatku a konca reťazca
$nazor = trim($nazor);
// prevedieme konce riadkov na značky <BR>
$nazor = str_replace("\r", "", $nazor);
$nazor = str_replace("\n", "<BR>", $nazor);
echo  "Toto je váš názor:
";
echo  $nazor;
?>

