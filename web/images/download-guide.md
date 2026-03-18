# Figma 图片下载指南

由于自动下载遇到连接问题，请按照以下步骤手动下载图片：

## 方法一：在 Figma 中批量导出

1. 打开 Figma 文件：https://www.figma.com/proto/7di4yxaJBynSHCfhj5WzmF/Untitled?node-id=1-816
2. 在左侧图层面板中找到以下节点，选中后右侧面板点击 "Export"
3. 设置导出格式为 PNG，Scale 选择 2x
4. 点击 Export 并保存到本目录

## 需要下载的图片列表：

### 主要图片（PNG格式，2x scale）：
1. **hero-image.png** 
   - 节点ID: `1:870`
   - 位置: Header 区域的右侧图片
   - 尺寸: 约 1835px × 1460px (2x)

2. **about-image.png**
   - 节点ID: `1:822`
   - 位置: About 区域的左侧图片
   - 尺寸: 约 1627px × 1992px (2x)

3. **project-ahuse.png**
   - 节点ID: `I1:819;18:132`
   - 位置: Portfolio 第一个项目卡片
   - 尺寸: 高度 800px (2x)

4. **project-dashboard.png**
   - 节点ID: `I1:819;22:477`
   - 位置: Portfolio 第二个项目卡片
   - 尺寸: 高度 800px (2x)

5. **project-easyrent.png**
   - 节点ID: `I1:819;22:488`
   - 位置: Portfolio 第三个项目卡片
   - 尺寸: 高度 800px (2x)

6. **avatar-dianne.png**
   - 节点ID: `I1:820;18:78`
   - 位置: Testimonials 第一个评价的头像
   - 尺寸: 149px × 149px (2x，圆形)

7. **avatar-kristin.png**
   - 节点ID: `I1:820;18:91`
   - 位置: Testimonials 第二个评价的头像
   - 尺寸: 149px × 149px (2x，圆形)

8. **avatar-kathryn.png**
   - 节点ID: `I1:820;18:104`
   - 位置: Testimonials 第三个评价的头像
   - 尺寸: 149px × 149px (2x，圆形)

## 方法二：使用 Figma 插件批量导出

1. 安装 Figma 插件 "Batch Export" 或 "Image Export"
2. 选择所有需要导出的图层
3. 设置导出格式和尺寸
4. 批量导出到本地文件夹
5. 将文件移动到本目录并重命名

## 方法三：使用 Figma API（高级）

如果你有 Figma API token，可以使用以下命令：

```bash
# 需要先安装 figma-export 工具
npm install -g figma-export

# 然后使用 API token 导出
figma-export --token YOUR_TOKEN --file 7di4yxaJBynSHCfhj5WzmF --output ./images
```

## 验证

下载完成后，请确认以下文件存在于 `images/` 目录：
- ✅ hero-image.png
- ✅ about-image.png
- ✅ project-ahuse.png
- ✅ project-dashboard.png
- ✅ project-easyrent.png
- ✅ avatar-dianne.png
- ✅ avatar-kristin.png
- ✅ avatar-kathryn.png

然后在浏览器中打开 `index.html` 查看效果。





