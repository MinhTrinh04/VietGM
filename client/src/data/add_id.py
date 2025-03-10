import json

# Load the json data
data = json.loads("""[
                {
                    "image": "/img/menu/Set-combo/set-combo4.jfif",
                    "title": "Combo Bùng nổ",
                    "price": "200K",
                    "currency": "VNĐ",
                    "rating": 5,
                    "text": "Giảm chỉ còn 200K: Bún bò Huế, Chả giò, Bánh flan."
                },
                {
                    "image": "/img/menu/Set-combo/set-combo1.jfif",
                    "title": "Combo Hồn Quê",
                    "price": "230K",
                    "currency": "VNĐ",
                    "rating": 5,
                    "text": "Giảm chỉ còn 230K: Gỏi cuốn, Phở bò, Bún chả, Bánh xèo."
                },
                {
                    "image": "/img/menu/Set-combo/set-combo3.jfif",
                    "title": "Combo Tươi Mát",
                    "price": "170K",
                    "currency": "VNĐ",
                    "rating": 5,
                    "text": "Giảm chỉ còn 170K: Nộm đu đủ, Bánh đa trộn, Chè thập cẩm."
                },
                {
                    "image": "/img/menu/Set-combo/set-combo2.jfif",
                    "title": "Combo Miền Tây",
                    "price": "155K",
                    "currency": "VNĐ",
                    "rating": 5,
                    "text": "Giảm chỉ còn 155K: Nộm hoa chuối, Cháo cá miền Tây, Chè thập cẩm."
                },
                {
                    "image": "/img/menu/Set-combo/set-combo5.jfif",
                    "title": "Combo Mẹ Nấu",
                    "price": "245K",
                    "currency": "VNĐ",
                    "rating": 5,
                    "text": "Giảm chỉ còn 245K: Cá kho tộ, Canh chua cá lóc, Trà Sen Tây Hồ kèm Cơm trắng."
                },
                {
                    "image": "/img/menu/Set-combo/set-combo6.jfif",
                    "title": "Buffet Tiệc Tùng",
                    "price": "350K",
                    "currency": "VNĐ",
                    "rating": 5,
                    "text": "Giảm chỉ còn 350K: Tự chọn Món khai vị, món chính, tráng miệng."
                }
            ]""")

# Add id key to each dictionary, starting from 1
for i, item in enumerate(data):
  item['id'] = i + 1


# Specify the output filename
output_filename = "output.json"

# Save the updated data to a JSON file
with open(output_filename, 'w', encoding='utf-8') as f:
  json.dump(data, f, ensure_ascii=False, indent=4)

print(f"Data saved to {output_filename}")