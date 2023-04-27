title: LeetCode算法题
date: 2016-03-15 19:29:50
tags:
- c++
- LeetCode
categories: algorithm
---
在找工作之前,一般会将c/c++,数据结构等知识复习一遍,同时也会找一些比较经典的面试题目学习。根据师兄师姐的介绍选择在LeetCode上进行相关算法的复习,维持一种编程状态,本篇博客介绍以下几种算法。
1.[Two Sum](https://leetcode-cn.com/problems/two-sum/description/):给定一个整数数组,找出其中两个数满足相加等于你指定的目标数字。
2.[Add Two Numbers](https://leetcode-cn.com/problems/add-two-numbers/description/):给两个链表代表两个反向存储的数字,返回他们的和,用链表表示。
3.[Add Digits](https://leetcode-cn.com/problems/add-digits/description/):给定一个非负整数num,重复地将其每位数字相加,直到结果只有一位数为止。
4.[Happy Number](https://leetcode-cn.com/problems/happy-number/description/):题目要求对任意一个正整数,不断各个数位上数字的平方和,若最终收敛为1,则该数字为happy number,否则程序可能从某个数开始陷入循环。
5.打印1到最大的n位数。
<!--more-->

## 1.Two Sum

[题目连接:https://leetcode-cn.com/problems/two-sum/description/](https://leetcode-cn.com/problems/two-sum/description/)

Given an array of integers, return **indices** of the two numbers such that they add up to a specific target.

You may assume that each input would have **exactly** one solution.

**Example:**
Given nums = [2, 7, 11, 15], target = 9,
Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].

看到题目首先想到的是通过两层循环进行暴力查找,但是这并不是面试官或者出题人本身想要看到的结果,人们更倾向于看到时间复杂度更低的算法。经过分析可以采用下面两种算法：

* **排序后查找**:首先将数组进行排序,然后两个指针分别指向排序后数组的首端和末端,如果对应的数相加小于给定的数target,则首端指针后移一位；如果对应的数相加大于给定的数target,则末端指针前移一位；如果相等则返回结果(Index 存储在vector)。

```cpp
#include<iostream>
#include<vector>
#include<algorithm>
using namespace std;
struct Node
{
	int num,pos;
};
bool cmp(Node a,Node b)
{
	return a.num<b.num;
}
class Solution{
public:
	vector<int> twoSum(vector<int>&nums,int target){
		vector<int> result;
		vector<Node> array;
		for(int i=0;i<nums.size();i++)
		{
			Node temp;
			temp.num=nums[i];
			temp.pos=i;
			array.push_back(temp);
		}
		sort(array.begin(),array.end(),cmp);
		for(int i=0,j=array.size()-1;i!=j;)
		{
			int sum=array[i].num+array[j].num;
			if(sum==target)
			{
				result.push_back(array[i].pos);
				result.push_back(array[j].pos);
				break;
			}
			else if(sum<target)
			{
				i++;
			}
			else{
				j--;
			}
		}
		return result;
	}
};
int main()
{
	Solution S;
	vector<int> vec;//创建vector对象
	vector<int> nums(3);
	nums[0]=2;nums[1]=7;nums[2]=7;
	int target=14;
	vec=S.twoSum(nums,target);
	vector<int>::iterator it;
	for(it=vec.begin();it!=vec.end();it++)
	{
		cout<<*it<<" ";
	}
	cout<<endl;
	vec.clear();
	system("pause");
}
```

* **Hash表**:将每个数字放在map中,然后历遍数组,如果map中出现和数组中的某一个值相加为target的时候,则break,输出结果。其中要考虑输出结果的两个Index不能相同,即target是数组中某一个数（该数只出现一次）的两倍,不满足要求。

```cpp
#include<iostream>
#include<vector>
#include<algorithm>
#include<map>
using namespace std;
class Solution{
public:
	vector<int> twoSum(vector<int>&nums,int target){
		vector<int> result;
		map<int,int> m;
		//map是模板,一个map变量key和value两个值,
		//map<int,int> m,m->first可以取得key值,m->second可以取得value值；
		for(int i=0;i<nums.size();i++)
		{
			m[nums[i]]=i;
		}
		map<int, int>::iterator it;
		/*for (it = m.begin(); it != m.end(); ++it)
        cout << it->first << "=" << it->second << endl; */
		for(int i=0;i<nums.size();i++)
		{
			if((it=m.find(target-nums[i]))!=m.end())//m.find(key)：返回迭代器,判断是否存在。
			{
				if(i==it->second) continue;
				result.push_back(i);
				result.push_back(it->second);
				break;
			}
		}
		return result;
	}
};
int main()
{
	Solution S;
	vector<int> vec;//创建vector对象
	vector<int> nums(4);
	nums[0]=2;nums[1]=7;nums[2]=12;nums[3]=13;
	int target=14;
	vec=S.twoSum(nums,target);
	/*for(int i=0;i<vec.size();i++)
	{
		cout<<vec[i]<<" ";
	}*/
	vector<int>::iterator it;
	for(it=vec.begin();it!=vec.end();it++)
	{
		cout<<*it<<" ";
	}
	cout<<endl;
	vec.clear();
	system("pause");
}
```

## 2.Add Two Numbers

[题目连接:https://leetcode-cn.com/problems/add-two-numbers/description/](https://leetcode-cn.com/problems/add-two-numbers/description/)

You are given two linked lists representing two non-negative numbers. 
The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

**Input**: (2 -> 4 -> 3) + (5 -> 6 -> 4)

**Output**: 7 -> 0 -> 8

**该题需要注意一下几点：**
* 数字存储是反过来存储的,因此我们只需要从两个链表的首端开始遍历；
* 考虑每次相加后的进位问题;
* 两个链表的长度不一样,对长链表(实际为多出来的位数)的处理;
* 当两个链表长度相同时,对最后一位相加的处理。

```cpp
#include<iostream>
#include<malloc.h>
using namespace std;
struct ListNode{
	int val;
	ListNode *next;
};
class Solution{
public:
	ListNode *addTwoNumbers(ListNode *l1,ListNode *l2)
	{
		ListNode *head=(ListNode *)malloc(sizeof(ListNode));
		ListNode *pre=head;
		ListNode *node=NULL;
		int flag=0,sum;//flag进位,sum为两个数的和
		while(l1!=NULL && l2!=NULL)
		{
			sum=l1->val+l2->val+flag;
			flag=sum/10;
			node=(ListNode *)malloc(sizeof(ListNode));
			node->val=sum%10;
			node->next=NULL;
			pre->next=node;
			pre=node;
			l1=l1->next;
			l2=l2->next;
		}
		while(l1!=NULL)
		{	
			sum=l1->val+flag;
			flag=sum/10;
			node = (ListNode *)malloc(sizeof(ListNode));
            node->val = sum % 10;
            node->next = NULL;
            pre->next = node;
            pre = node;
            l1 = l1->next;
		}
		while(l2!=NULL)
		{
			sum = l2->val + flag;
            flag= sum / 10;
            node = (ListNode *)malloc(sizeof(ListNode));
            node->val = sum % 10;
            node->next = NULL;
            pre->next = node;
            pre = node;
            l2 = l2->next;
		}
		if(flag>0)
		{
			node = (ListNode *)malloc(sizeof(ListNode));
            node->val = flag;
            node->next = NULL;
            pre->next = node;
            pre = node;
		}
		return head->next;
	}
};
int main() {
    Solution solution;
    int A[] = {2,4,7,9};
    int B[] = {5,6,4};
    ListNode *head = NULL;
    ListNode *head1 = (ListNode*)malloc(sizeof(ListNode));
    ListNode *head2 = (ListNode*)malloc(sizeof(ListNode));
    head1->next = NULL;
    head2->next = NULL;
    ListNode *node;
    ListNode *pre = head1;
    for(int i = 0;i < 4;i++){
        node = (ListNode*)malloc(sizeof(ListNode));
        node->val = A[i];
        node->next = NULL;
        pre->next = node;
        pre = node;
    }
    pre = head2;
    for(int i = 0;i < 3;i++){
        node = (ListNode*)malloc(sizeof(ListNode));
        node->val = B[i];
        node->next = NULL;
        pre->next = node;
        pre = node;
    }
    head = solution.addTwoNumbers(head1->next,head2->next);
    while(head != NULL){
        printf("%d ",head->val);
        head = head->next;
    }
	system("pause");
    return 0;
}
```

## 3.Add Digits

[题目连接:https://leetcode-cn.com/problems/add-digits/description/](https://leetcode-cn.com/problems/add-digits/description/)

Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.

**For example:**
Given num = 38, the process is like: 3 + 8 = 11, 1 + 1 = 2. Since 2 has only one digit, return it.

对于任意给定的数字$x$(以三位数为例),$x=100a+10b+c$,其中a,b,c分别为百位,十位和个位。同时$x$可表示为如下：

$$x=99a+9b+(a+b+c)$$

除了a+b=c以外,剩余的一定能被9整除,因此所有位上的和就是求取x%9的结果,但当x能被9整除时,$x\%9=0$,而正确的结果为9,因此我们可以得到如下表达式:

$$sum(n) = 1 + (n-1) \% 9$$

```cpp
#include<iostream>
using namespace std;
class Solution {
public:
    int addDigits(int num) {
        if(num<10)return num;
		else
		{
			  return (num - 1) % 9 + 1;
		}
    }
};

int main(){
	Solution solution;
	int num=38;
	cout<<solution.addDigits(num)<<endl;
	system("pause");
	return 0;
}
```

## 4.Happy Number

[题目连接:https://leetcode-cn.com/problems/happy-number/description/](https://leetcode-cn.com/problems/happy-number/description/)

A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.

**Example: 19 is a happy number**

$1^2 + 9^2 = 82$
$8^2+ 2^2 = 68$
$6^2+ 8^2= 100$
$1^2 + 0^2 + 0^2 = 1$

* 方法(1):
在维基百科[Happy number](https://en.wikipedia.org/wiki/Happy_number)中我们发现从1到10中1,7,10是Happy number,其余的都是non-happy number。所有的non-happy numbers(1,2,...,n)都会达到如下循环:

**4,16,37,58,89,145,42,20,4,......**

```cpp
#include<iostream>
using namespace std;
class Solution {
public:
    bool isHappy(int n) {
	    while(n>6){//2,3,4,5都为non-happy numbers
        int next = 0;
        while(n){next+=(n%10)*(n%10); n/=10;}
        n = next;
    }
    return n==1;
	}
};

int main(){
	Solution solution;
	int n=19;
	cout<<solution.isHappy(n)<<endl;
	system("pause");
	return 0;
}
```

* 方法(2)
我们需要通过一个哈希表存储已经出现过的数字即可。可以采用set集合容器来解决此问题(当然vector,map也可以解决此问题)。每次将其所有位上的平方和结果存储在set里,若结果为1,则是happy number；若出现重复,则是non-happy number。

```cpp
#include<iostream>
#include<set>
using namespace std;
class Solution {
public:
    bool isHappy(int n) {
        if (n < 1)
            return false;
        if (n == 1)
            return true;
        set<int> showedNums;
        showedNums.insert(n);

        while(true)
        {
            int s = 0;
            while(n)
            {
                s += (n % 10) * (n % 10);
                n = n / 10;
            }

            if (s == 1)
                return true;
            else if (showedNums.find(s) != showedNums.end())
                return false;
            n = s;
            showedNums.insert(s);
        }
    }
};

int main(){
	Solution solution;
	int n=20;
	cout<<solution.isHappy(n)<<endl;
	system("pause");
	return 0;
}
```
## 5.打印1到最大的n位数

题目：输入数字n,按顺序打印出从1最大的n位十进制数。比如输入3,则打印出1、2、3一直到最大的3位数即999。

* **在字符串上模拟数字加法的解法**
由于输入n的值不太确定,当n输入很大时,我们求最大n位数是不能通过整型(int)或者长正型(long long int)表示的,因为都会溢出。因此采用字符串表示或者数组表示大数。

```cpp
#include<iostream>
#include<string>
using namespace std;

bool Increment(char *number)
{
	bool isOverflow=false;
	int nTakeOver=0;
	int nLength=strlen(number);//strlen返回的长度不含'\0'
	for(int i=nLength-1;i>=0;i--)
	{
		int nSum=number[i]-'0'+nTakeOver;
		if(i==nLength-1)
			nSum++;
		if(nSum>=10)
		{
			if(i==0)
				isOverflow=true;
			else
			{
				nSum-=10;
				nTakeOver=1;
				number[i]='0'+nSum;
			}
		}
		else
		{
			number[i]='0'+nSum;
			break;
		}
	}
	return isOverflow;
}


void PrintNumber(char *number){
	bool isBeginning0=true;
	int nLength=strlen(number);
	for(int i=0;i<nLength;++i)
	{
		if(isBeginning0&&number[i]!='0')
			isBeginning0=false;
		if(!isBeginning0)
		{
			printf("%c",number[i]);
		}
	}
	printf("\t");
}

void Print1ToMaxOfNDigits(int n)
{
	
	if(n<=0)return;
	char *number=new char[n+1];//字符串末结束符号为'\0'
    memset(number,'0',n);
    number[n]='\0';
	while(!Increment(number))
	{
		PrintNumber(number);
	}
	delete []number;
	
}

int main(){
	int n;
	cin>>n;
	Print1ToMaxOfNDigits(n);
	system("pause");
}
```

* **把问题转换为数字排列的解法**
把数字的每一位都从0到9排列一遍,就得到了所有的十进制数,全排列采用递归实现。

```cpp
#include<iostream>
#include<string>
using namespace std;

void PrintNumber(char *number){
	bool isBeginning0=true;
	int nLength=strlen(number);
	for(int i=0;i<nLength;++i)
	{
		if(isBeginning0&&number[i]!='0')
			isBeginning0=false;
		if(!isBeginning0)
		{
			printf("%c",number[i]);
		}
	}
	printf("\t");
}

void Print1ToMaxOfNDigitsRecursively(char *number,int length,int index){
	if(index==length-1)
	{
		PrintNumber(number);
		return;
	}
	for(int i=0;i<10;++i)
	{
		number[index+1]=i+'0';
		Print1ToMaxOfNDigitsRecursively(number,length,index+1);
	}
}

void Print1ToMaxOfNDigits(int n)
{
	
	if(n<=0)return;
	char *number=new char[n+1];
    memset(number,'0',n);
    number[n]='\0';
	for(int i=0;i<10;i++)
	{
		number[0]=i+'0';
		Print1ToMaxOfNDigitsRecursively(number,n,0);
	}
	delete []number;
}

int main(){
	int n;
	cin>>n;
	Print1ToMaxOfNDigits(n);
	system("pause");
}
```

* **n的取值范围**
题目给出的是数字n,未说明n的取值范围,而上述两种方法中输入的n都为整数,如果n的值超出整型和长整形表示范围后,具体应该如何实现？通过字符串和数组虽然能够表示n,但是n过大时,计算机无法开辟那么大的空间；就算可以开辟,new char[n]其中n如何表示(因为n超出整型或者长整型的表示范围,是一个字符串或者数组)。因此输入的数字n是用整型表示的。