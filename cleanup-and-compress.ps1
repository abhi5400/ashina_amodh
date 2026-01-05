# Cleanup and Compress Script for Ashiana Amodh Website
# This script removes unused files and compresses images

Write-Host "Starting cleanup and compression..." -ForegroundColor Green

# 1. Remove all .tif files (not used in HTML, only .jpg files are used)
Write-Host "`nRemoving .tif files..." -ForegroundColor Yellow
$tifFiles = Get-ChildItem -Path "assets" -Recurse -Filter "*.tif"
$tifFiles += Get-ChildItem -Path "assets" -Recurse -Filter "*.TIF"
$tifCount = $tifFiles.Count
$tifSize = ($tifFiles | Measure-Object -Property Length -Sum).Sum / 1MB
if ($tifFiles.Count -gt 0) {
    $tifFiles | Remove-Item -Force
    Write-Host "Removed $tifCount .tif files ($([math]::Round($tifSize, 2)) MB)" -ForegroundColor Green
} else {
    Write-Host "No .tif files found" -ForegroundColor Gray
}

# 2. Remove unused .mp4 file (only "Ashiana Advik..." is used)
Write-Host "`nRemoving unused video file..." -ForegroundColor Yellow
$unusedVideo = "assets\Amodh CP Booklet\Concept video and Walkthrough\Amodh Walkthrough without Flat.mp4"
if (Test-Path $unusedVideo) {
    $size = (Get-Item $unusedVideo).Length / 1MB
    Remove-Item $unusedVideo -Force
    Write-Host "Removed unused video: $([math]::Round($size, 2)) MB" -ForegroundColor Green
} else {
    Write-Host "Unused video file not found" -ForegroundColor Gray
}

# 3. Remove .zip file
Write-Host "`nRemoving .zip file..." -ForegroundColor Yellow
$zipFiles = Get-ChildItem -Path "assets" -Recurse -Filter "*.zip"
if ($zipFiles.Count -gt 0) {
    $zipSize = ($zipFiles | Measure-Object -Property Length -Sum).Sum / 1MB
    $zipFiles | Remove-Item -Force
    Write-Host "Removed $($zipFiles.Count) zip file(s) ($([math]::Round($zipSize, 2)) MB)" -ForegroundColor Green
} else {
    Write-Host "No .zip files found" -ForegroundColor Gray
}

# 4. Compress JPG images using .NET GDI+ (built into Windows)
Write-Host "`nCompressing JPG images..." -ForegroundColor Yellow
Add-Type -AssemblyName System.Drawing

$jpgFiles = Get-ChildItem -Path "assets\Amodh CP Booklet\Amodh Elevations" -Filter "*.jpg"
$totalSaved = 0
$compressedCount = 0

foreach ($file in $jpgFiles) {
    try {
        $originalSize = $file.Length
        $image = [System.Drawing.Image]::FromFile($file.FullName)
        
        # Create a new bitmap with the same dimensions
        $bitmap = New-Object System.Drawing.Bitmap($image.Width, $image.Height)
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        $graphics.DrawImage($image, 0, 0, $image.Width, $image.Height)
        
        # Save with JPEG compression (quality 85%)
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 85)
        
        # Save to temporary file first
        $tempFile = $file.FullName + ".tmp"
        $bitmap.Save($tempFile, $jpegCodec, $encoderParams)
        
        # Replace original if compressed version is smaller
        $newSize = (Get-Item $tempFile).Length
        if ($newSize -lt $originalSize) {
            Move-Item -Path $tempFile -Destination $file.FullName -Force
            $saved = ($originalSize - $newSize) / 1MB
            $totalSaved += $saved
            $compressedCount++
            Write-Host "  Compressed: $($file.Name) - Saved $([math]::Round($saved, 2)) MB" -ForegroundColor Cyan
        } else {
            Remove-Item $tempFile -Force
        }
        
        $image.Dispose()
        $bitmap.Dispose()
        $graphics.Dispose()
    } catch {
        Write-Host "  Error compressing $($file.Name): $_" -ForegroundColor Red
    }
}

if ($compressedCount -gt 0) {
    Write-Host "`nCompressed $compressedCount images, saved $([math]::Round($totalSaved, 2)) MB total" -ForegroundColor Green
} else {
    Write-Host "No images needed compression" -ForegroundColor Gray
}

# 5. Check video file size
Write-Host "`nChecking video file..." -ForegroundColor Yellow
$videoFile = "assets\Amodh CP Booklet\Concept video and Walkthrough\Ashiana Advik, Bhiwadi (Delhi NCR) _ Senior Living Reimagined-(1080p_3.mp4"
if (Test-Path $videoFile) {
    $videoSize = (Get-Item $videoFile).Length / 1MB
    Write-Host "Video file size: $([math]::Round($videoSize, 2)) MB" -ForegroundColor Yellow
    if ($videoSize -gt 100) {
        Write-Host "WARNING: Video file is very large ($([math]::Round($videoSize, 2)) MB)" -ForegroundColor Red
        Write-Host "Consider hosting on YouTube or compressing with HandBrake/FFmpeg" -ForegroundColor Yellow
    }
}

# Summary
Write-Host "`n=== Cleanup Complete ===" -ForegroundColor Green
Write-Host "Check the results above. You may need to manually compress the video file." -ForegroundColor Cyan

