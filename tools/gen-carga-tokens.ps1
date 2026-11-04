# Gera os tokens do módulo CARGA SEM NOME (assets/tokens/*.png) a partir da arte do pacote de imagens.
# Uso (Windows PowerShell): powershell -ExecutionPolicy Bypass -File tools/gen-carga-tokens.ps1
# - Personagens com arte: recorte quadrado da própria imagem, em círculo, com anel colorido.
# - Sem arte (Capangas, Policiais, Droids, Eurico, Tesoureira): círculo escuro com as iniciais.
# - Viaturas e SUV: ícone de carro visto de cima (proporção 2 x 3).
# - Jararaca: marcador transparente (o blindado já está desenhado no mapa; o token só carrega HP e nome).
# Nunca sobrescreve um arquivo que já exista, para não perder um token refeito à mão. Use -Force para refazer tudo.
param([switch]$Force)
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$assets = Join-Path $root 'modules\sombraneon-carga-sem-nome\assets'
$out = Join-Path $assets 'tokens'
New-Item -ItemType Directory -Force $out | Out-Null

function Color($hex) { [System.Drawing.ColorTranslator]::FromHtml($hex) }

function New-Canvas($w, $h) {
  $bmp = New-Object System.Drawing.Bitmap $w, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.InterpolationMode = 'HighQualityBicubic'
  $g.TextRenderingHint = 'AntiAlias'
  $g.Clear([System.Drawing.Color]::Transparent)
  return @($bmp, $g)
}

function Save-Token($bmp, $g, $name) {
  $g.Dispose()
  $bmp.Save((Join-Path $out "$name.png"), [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

function Should-Make($name) { return $Force -or -not (Test-Path (Join-Path $out "$name.png")) }

# Recorte de arte em círculo: $crop = x, y, tamanho (quadrado) na imagem original
function Make-Art($name, $file, $crop, $ring) {
  if (-not (Should-Make $name)) { return }
  $src = [System.Drawing.Image]::FromFile((Join-Path $assets $file))
  $size = 256
  $c = New-Canvas $size $size
  $bmp = $c[0]; $g = $c[1]
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddEllipse(8, 8, $size - 16, $size - 16)
  $g.SetClip($path)
  $dest = New-Object System.Drawing.Rectangle 0, 0, $size, $size
  $g.DrawImage($src, $dest, $crop[0], $crop[1], $crop[2], $crop[2], [System.Drawing.GraphicsUnit]::Pixel)
  $g.ResetClip()
  $pen = New-Object System.Drawing.Pen (Color $ring), 10
  $g.DrawEllipse($pen, 8, 8, $size - 16, $size - 16)
  $black = New-Object System.Drawing.Pen ([System.Drawing.Color]::Black), 3
  $g.DrawEllipse($black, 3, 3, $size - 6, $size - 6)
  $src.Dispose()
  Save-Token $bmp $g $name
}

function Make-Initials($name, $text, $ring) {
  if (-not (Should-Make $name)) { return }
  $size = 256
  $c = New-Canvas $size $size
  $bmp = $c[0]; $g = $c[1]
  $fill = New-Object System.Drawing.SolidBrush (Color '#1b1d22')
  $g.FillEllipse($fill, 8, 8, $size - 16, $size - 16)
  $pen = New-Object System.Drawing.Pen (Color $ring), 10
  $g.DrawEllipse($pen, 8, 8, $size - 16, $size - 16)
  $font = New-Object System.Drawing.Font 'Arial', 78, ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel)
  $fmt = New-Object System.Drawing.StringFormat
  $fmt.Alignment = 'Center'; $fmt.LineAlignment = 'Center'
  $brush = New-Object System.Drawing.SolidBrush (Color $ring)
  $rect = New-Object System.Drawing.RectangleF 0, 6, $size, $size
  $g.DrawString($text, $font, $brush, $rect, $fmt)
  Save-Token $bmp $g $name
}

# Carro visto de cima, proporção 2 x 3 (200 x 300)
function Make-Car($name, $body, $accent) {
  if (-not (Should-Make $name)) { return }
  $c = New-Canvas 200 300
  $bmp = $c[0]; $g = $c[1]
  $out1 = New-Object System.Drawing.Pen ([System.Drawing.Color]::Black), 6
  $fillBody = New-Object System.Drawing.SolidBrush (Color $body)
  $g.FillRectangle($fillBody, 30, 14, 140, 272)
  $g.DrawRectangle($out1, 30, 14, 140, 272)
  $glass = New-Object System.Drawing.SolidBrush (Color '#0d0f12')
  $g.FillRectangle($glass, 44, 70, 112, 40)
  $g.FillRectangle($glass, 44, 190, 112, 36)
  $g.FillRectangle((New-Object System.Drawing.SolidBrush (Color '#2b2f36')), 44, 112, 112, 76)
  $bar = New-Object System.Drawing.SolidBrush (Color $accent)
  $g.FillRectangle($bar, 52, 120, 96, 14)
  $g.FillRectangle($bar, 52, 166, 96, 14)
  $lamp = New-Object System.Drawing.SolidBrush (Color '#ffe082')
  $g.FillRectangle($lamp, 40, 20, 26, 14)
  $g.FillRectangle($lamp, 134, 20, 26, 14)
  Save-Token $bmp $g $name
}

function Make-Transparent($name, $w, $h) {
  if (-not (Should-Make $name)) { return }
  $c = New-Canvas $w $h
  Save-Token $c[0] $c[1] $name
}

$RED = '#ff1744'; $AMBER = '#ffb300'; $GREEN = '#69f0ae'; $CYAN = '#00e5ff'; $MAG = '#ff4081'; $VIO = '#b388ff'; $ORANGE = '#ff6d00'; $GOLD = '#ffd740'; $TOXIC = '#76ff03'

# Runners (retratos 896 x 1200: quadrado do topo, cabeça e ombros)
Make-Art 'tijolo' 'portraits\ret-01-tijolo.jpg' @(60, 10, 800) $RED
Make-Art 'bit' 'portraits\ret-02-bit.jpg' @(60, 10, 800) $CYAN
Make-Art 'cinza' 'portraits\ret-03-cinza.jpg' @(60, 10, 800) $TOXIC
Make-Art 'cobra' 'portraits\ret-04-cobra.jpg' @(60, 10, 800) $VIO
Make-Art 'fumaca' 'portraits\ret-05-fumaca.jpg' @(60, 10, 800) $MAG
Make-Art 'corvo' 'portraits\ret-06-corvo.jpg' @(60, 10, 800) $ORANGE

# NPCs e aliados com arte
Make-Art 'tavares' 'img\img-07-tavares.jpg' @(60, 120, 760) $MAG
Make-Art 'seu-jaci' 'img\img-12-seu-jaci.jpg' @(60, 120, 760) $MAG
Make-Art 'sargento-teixeira' 'img\img-21-sargento-teixeira.jpg' @(60, 60, 760) $AMBER
Make-Art 'daigo-okabe' 'img\img-27-daigo-okabe.jpg' @(60, 40, 760) $GREEN
Make-Art 'nest' 'img\img-28-nest-equipado.jpg' @(180, 20, 560) $GREEN
Make-Art 'dona-ruth' 'img\img-01-ruth-e-a-rota.jpg' @(400, 50, 420) $AMBER
Make-Art 'capita-voss' 'img\img-31-capita-voss.jpg' @(40, 170, 560) $TOXIC

# Máquinas com arte
Make-Art 'drone-falcao' 'img\img-18-o-falcao.jpg' @(448, 90, 480) $TOXIC
Make-Art 'torre-50' 'img\img-22-a-torre-50.jpg' @(490, 40, 440) $AMBER
Make-Art 'cerbero' 'img\img-23-o-cerbero.jpg' @(380, 60, 640) $RED

# Sem arte: iniciais
Make-Initials 'capanga-caes' 'CV' $RED
Make-Initials 'atirador-caes' 'AV' $RED
Make-Initials 'policial-urbano' 'PG' $RED
Make-Initials 'droid-combate' 'DC' $RED
Make-Initials 'motorista-jararaca' 'EU' $AMBER
Make-Initials 'tesoureira' 'TM' $AMBER

# Veículos
Make-Car 'viatura-guarda' '#cfd2d8' $RED
Make-Car 'suv-aegis' '#2a2d33' $TOXIC
Make-Transparent 'jararaca' 256 256

Write-Host ("Tokens em " + $out + ": " + (Get-ChildItem $out -Filter *.png).Count + " arquivos.")
