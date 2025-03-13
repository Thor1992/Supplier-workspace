#!/bin/bash

# 创建目录
mkdir -p public/avatars
mkdir -p public/products
mkdir -p public/backgrounds
mkdir -p public/icons

# 下载买家头像
curl -o public/avatars/buyer1.jpg https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200
curl -o public/avatars/buyer2.jpg https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200
curl -o public/avatars/buyer3.jpg https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200
curl -o public/avatars/buyer4.jpg https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200
curl -o public/avatars/buyer5.jpg https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200

# 下载商品图片
curl -o public/products/headphones-1.jpg https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300
curl -o public/products/phone-case-1.jpg https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=300
curl -o public/products/smartwatch-1.jpg https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=300
curl -o public/products/charger-1.jpg https://images.unsplash.com/photo-1583863788434-e62bd31fbc6d?q=80&w=300
curl -o public/products/earbuds-1.jpg https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?q=80&w=300

# 下载背景图片
curl -o public/backgrounds/bg-1.jpg https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=500
curl -o public/backgrounds/bg-2.jpg https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=500

echo "All images downloaded successfully!" 