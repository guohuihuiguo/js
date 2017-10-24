## git使用

**创建一个仓库  new repository 输入仓库名  创建readme**  

	$ git clone   仓库地址
	
	$ git add -A  添加文件
	
	$ git commit -m'注释内容' 提交到历史去
	
	$ git pull origin master 拉取更新文件
	
	$ git push origin master 推到github仓库上去
	
	$ git config --list  检测git的用户跟邮箱信息
	
	$ git config --global user.email "你设置的邮箱"  修改邮箱
	
	$ git config --global user.name "用户名"  修改用户名
	
	$ git remote -v  查看当前文件与之关联的仓库
	
	$ git remote add 新的仓库名  新仓库的地址****
	
	（window初始化时出现的问题：$ git config --global user.email "你设置的邮箱" 
	$ git config --global user.name "你的用户名"）
	
克隆别人的仓库可以用fork
	