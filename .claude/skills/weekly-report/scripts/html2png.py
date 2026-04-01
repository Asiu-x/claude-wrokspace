#!/usr/bin/env python3
"""将周报HTML转换为PNG图片，自动裁剪底部空白。

用法: python3 html2png.py <html_path> <png_path> [width] [height]
示例: python3 html2png.py report.html report.png 1080 4200
"""
import sys
from html2image import Html2Image
from PIL import Image


def main():
    if len(sys.argv) < 3:
        print("用法: python3 html2png.py <html_path> <png_path> [width] [height]")
        sys.exit(1)

    html_path = sys.argv[1]
    png_path = sys.argv[2]
    width = int(sys.argv[3]) if len(sys.argv) > 3 else 1080
    height = int(sys.argv[4]) if len(sys.argv) > 4 else 4200

    import os
    output_dir = os.path.dirname(os.path.abspath(png_path))
    tmp_name = os.path.basename(png_path)

    hti = Html2Image(
        output_path=output_dir,
        browser='chrome',
        custom_flags=['--default-background-color=ffffffff']
    )

    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()

    hti.screenshot(html_str=html, save_as=tmp_name, size=(width, height))

    # 裁剪底部空白
    img = Image.open(png_path)
    pixels = img.load()
    w, h = img.size
    last_row = h - 1
    for y in range(h - 1, 0, -1):
        row_sum = sum(
            pixels[x, y][0] + pixels[x, y][1] + pixels[x, y][2]
            for x in range(0, w, 10)
        )
        avg = row_sum / (w // 10) / 3
        if avg < 252:
            last_row = y
            break

    cropped = img.crop((0, 0, w, last_row + 50))
    cropped.save(png_path)
    print(f"生成完成: {png_path} ({w}x{cropped.size[1]})")


if __name__ == '__main__':
    main()
