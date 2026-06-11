# Generates public/og.png (1200x630) and public/apple-touch-icon.png (180x180)
# Draws the Parmelia 3-layer mark from its polygon geometry (viewBox 171x198).
Add-Type -AssemblyName System.Drawing

function Get-LogoLayers {
    param([float]$x, [float]$y, [float]$scale)
    $sky   = @(@(85,1),(170,59),(85,118),(0,59))
    $pink  = @(@(0,67.4),(85,125.2),(170,67.9),(170,99.1),(85,157.7),(0,98.7))
    $cream = @(@(0,106.9),(85,164.6),(170,107.3),(170,138.5),(85,197.1),(0,138.1))
    $layers = @()
    foreach ($def in @(@($sky,'#A7D4DE'), @($pink,'#DEA6BC'), @($cream,'#DED9A6'))) {
        $pts = @()
        foreach ($p in $def[0]) {
            $pts += [System.Drawing.PointF]::new($x + $p[0]*$scale, $y + $p[1]*$scale)
        }
        $layers += ,@($pts, $def[1])
    }
    return $layers
}

function Draw-Logo {
    param([System.Drawing.Graphics]$g, [float]$x, [float]$y, [float]$scale)
    foreach ($layer in (Get-LogoLayers $x $y $scale)) {
        $color = [System.Drawing.ColorTranslator]::FromHtml($layer[1])
        $brush = New-Object System.Drawing.SolidBrush($color)
        $g.FillPolygon($brush, $layer[0])
        $brush.Dispose()
    }
}

function New-Glow {
    param([float]$cx, [float]$cy, [float]$r, [int]$cr, [int]$cg, [int]$cb, [int]$alpha)
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddEllipse($cx - $r, $cy - $r, $r * 2, $r * 2)
    $brush = New-Object System.Drawing.Drawing2D.PathGradientBrush($path)
    $brush.CenterColor = [System.Drawing.Color]::FromArgb($alpha, $cr, $cg, $cb)
    $brush.SurroundColors = @([System.Drawing.Color]::FromArgb(0, $cr, $cg, $cb))
    return ,@($brush, $path)
}

# ---------- OG image 1200x630 ----------
$bmp = New-Object System.Drawing.Bitmap(1200, 630)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.TextRenderingHint = 'AntiAliasGridFit'

$g.Clear([System.Drawing.ColorTranslator]::FromHtml('#0A0A0B'))

$glow1 = New-Glow 180 40 620 167 212 222 38
$g.FillEllipse($glow1[0], 180-620, 40-620, 1240, 1240)
$glow2 = New-Glow 1060 560 600 222 166 188 34
$g.FillEllipse($glow2[0], 1060-600, 560-600, 1200, 1200)
$glow3 = New-Glow 1080 80 480 239 224 140 22
$g.FillEllipse($glow3[0], 1080-480, 80-480, 960, 960)

Draw-Logo $g 96 130 0.62

$titleFont = New-Object System.Drawing.Font('Segoe UI Semibold', 56, [System.Drawing.FontStyle]::Bold)
$white = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#F5F5F3'))
$g.DrawString('Mueve dinero digital', $titleFont, $white, 270, 170)
$skyBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#9CE3F4'))
$g.DrawString('como mandar un mensaje.', $titleFont, $skyBrush, 270, 258)

$subFont = New-Object System.Drawing.Font('Segoe UI', 26)
$muted = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(176, 245, 245, 243))
$g.DrawString('Cobra con links, paga con QR y envía a usernames.', $subFont, $muted, 274, 380)

$urlFont = New-Object System.Drawing.Font('Segoe UI Semibold', 24, [System.Drawing.FontStyle]::Bold)
$cream = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#DED9A6'))
$g.DrawString('parmelia.me', $urlFont, $cream, 274, 520)

$g.Dispose()
$bmp.Save("$PSScriptRoot\..\public\og.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

# ---------- Apple touch icon 180x180 ----------
$icon = New-Object System.Drawing.Bitmap(180, 180)
$gi = [System.Drawing.Graphics]::FromImage($icon)
$gi.SmoothingMode = 'AntiAlias'
$gi.Clear([System.Drawing.ColorTranslator]::FromHtml('#0A0A0B'))
# logo 171x198 scaled to ~118px tall, centered
$s = 118 / 198
Draw-Logo $gi ((180 - 171*$s)/2) ((180 - 198*$s)/2) $s
$gi.Dispose()
$icon.Save("$PSScriptRoot\..\public\apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$icon.Dispose()

Write-Host 'og.png + apple-touch-icon.png generated'
