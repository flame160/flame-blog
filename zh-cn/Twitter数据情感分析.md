如今,社交已经成为生活必不可少的事情,社交网络(twitter,facebook……)中所包含的数据越来越庞大,如何根据自己的需求去获取相关的数据,进而再从这些数据中进行分析,得到有用的信息。本博客基于twitter社交网络,根据关键字和日期获取与俄罗斯战机在土耳其被击落的相关信息,然后将获得的数据进行sentiment analysis,得到人们关于此事件的正负情绪。
<!--more-->

## 1.获取Twitter数据

#### （1）准备工作 
* **操作系统**:linux(ubuntu),当然window也可以,只是没有ubuntu方便。
* **python安装**:最好是安装python2.7版本。
* **pip安装**:通过pip来安装其它包(比apt-get较好)。
* **tweepy安装**:使用tweepy获得twitter数据。
* **twitter账号申请**:首先需要翻墙(vpn或者其它方式),注册一个twitter账号,但是会遇到一个问题,国内的手机号无法验证（比较无奈:可以利用网上所提供的方法和请求他人帮忙注册）,本文利用他人的twitter账号。注册之后需要创建[New app](https://apps.twitter.com/),获得Keys和Access Tokens。完成这些,前期准备工作就已经结束了。

#### （2）数据获取
* **获取实时数据**:利用[Twitter Stream API和Python](http://adilmoujahid.com/posts/2014/07/twitter-analytics/)获得twitter实时数据。建立twitter_streaming.py,代码如下。
```python
#Import the necessary methods from tweepy library
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream

#Variables that contains the user credentials to access Twitter API 
access_token = "437532854***********hxpcI8gWLTU0p3Cmg6igY"
access_token_secret = "d3A***********6L3T2thB2ODNND9"
consumer_key = "VXO*********WnR0eooSNFO"
consumer_secret = "9ol**********iN7XgV8D67"

#This is a basic listener that just prints received tweets to stdout.
class StdOutListener(StreamListener):

    def on_data(self, data):
        print data
        return True

    def on_error(self, status):
        print status

if __name__ == '__main__':

    #This handles Twitter authetification and the connection to Twitter Streaming API
    l = StdOutListener()
    auth = OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    stream = Stream(auth, l)

    #This line filter Twitter Streams to capture data by the keywords: 'python', 'javascript', 'ruby'
    stream.filter(track=['python', 'javascript', 'ruby'])
```
**access_token,access_token_secret,consumer_key,consumer_secret即前期准备中(最后一步)你所获得。运行python twitter_streaming.py,便可将结果显示在终端,获得运行python twitter_streaming.py > twitter_data.txt将结果保存在twitter_data.txt文件夹,为json格式,各个key-value代表的意思参考[twitter API](https://dev.twitter.com/overview/api/tweets)。**

* **根据关键字和日期获取twitter数据**:大多时候我们并不是想要获取所有的twitter信息,而是根据所提供的关键字来获取信息,不过tweepy只能获取前7-10天的信息。
```python
import tweepy
import csv

access_token = "4375328544***********8OnhxpcI8gWLTU0p3Cmg6igY"
access_token_secret = "d3ABl********KtWIDkpo6L3T2thB2ODNND9"
consumer_key = "VXO*******R0eooSNFO"
consumer_secret = "9olt*******j9PMKN7CnT4GkdiN7XgV8D67"


auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

# Open/Create a file to append data
csvFile = open('tweetsData.csv', 'a')
#Use csv Writer
csvWriter = csv.writer(csvFile)


for tweet in tweepy.Cursor(api.search,
    q="key word",
    since="2015-12-02",
    until="2015-12-03",
    #startSince = '2015-11-25 00:00:00',
    #endUntil = '2015-11-25 23:59:59',
    lang="en").items():
    #print tweet.created_at, tweet.text, tweet.place, tweet.coordinates
    csvWriter.writerow([tweet.created_at, tweet.text.encode('utf-8'),tweet.place,tweet.coordinates])
```
**"key word"即为你需要的关键词,since起始日期,until结束日期,但是不能精确到HH:MM,及使用2015-11-25 00:00:00不行。结果以csv格式存储在tweetsData.csv中。其中注意的是不能频繁请求,否则出现[twitter 629 错误](http://stackoverflow.com/questions/15747575/twitter-api-is-returning-http-429-too-many-requests),当然还有其它[常见错误](https://dev.twitter.com/overview/api/response-codes)。获取更早以前的数据可以利用工具[TOPSY](http://topsy.com/s?q=Russian%20jet&type=tweet&mintime=1448398843)和[tweet](https://twitter.com/search?f=tweets&vertical=default&q=%23Russian%20OR%20%23flight%20OR%20%23Turkey%20since%3A2015-11-24%20until%3A2015-12-03&src=typd)。**

## 2.Twitter数据分析

#### （1）数据分析工具
获得Twitter数据后,我们会将其进行[简单分析](http://adilmoujahid.com/posts/2014/07/twitter-analytics/),其中比较常规的是进行Sentiment Analysis, 可以利用工具[sentiment140](http://www.sentiment140.com/),但是数据量较小。还可以利用工具[sentiment viz](https://www.csc.ncsu.edu/faculty/healey/tweet_viz/tweet_app/)和[Streamcrab工具](http://www.streamcrab.com/results?keyword=love),效果看起来不错。可以利用[AlchemyAPI](http://www.alchemyapi.com/developers/getting-started-guide/twitter-sentiment-analysis#get-api-key)进行分析。我们还可以根据geolocation[1](https://blog.twitter.com/2014/tweet-emotion-real-time-tweet-analysis-with-pubnub-data-stream),[2](https://github.com/tmwagency/node-twitter-heatmap),[3](http://gdeltproject.org/)属性做的更好。

[sentiment140](http://www.sentiment140.com/)对twitter数据进行情感分析,后来发现其也提供相应的API,[sentiment140 API](http://help.sentiment140.com/api)使用较为简单。
* 数据
```json
{'data': [{'text': 'I love Titanic.'}]}
```
* 运行
```python
curl -d "{'data': [{'text': 'I love Titanic.'}]}" http://www.sentiment140.com/api/bulkClassifyJson
curl --data-binary @test.txt "http://www.sentiment140.com/api/bulkClassify?query=obama"
curl --data-binary @test.csv "http://www.sentiment140.com/api/bulkClassify?query=obama"
```
* 显示结果
```json
{"data":[{"text":"I love Titanic.","polarity":4}]}
```
其中显示结果针对第一条运行命令,0: negative, 2: neutral,4: positive

#### （2）Naive Bayes Classifier
[该博客](http://ravikiranj.net/posts/2012/code/how-build-twitter-sentiment-analyzer/#id21)中提供了很多twitter sentiment analysis算法,本博客讲述其中的一种方法Naive Bayes Classifier。
下面是具体代码,包括数据得预处理过程,和特征提取过程。
```python
import re
import nltk
import csv
#start process_tweet
def processTweet(tweet):
    # process the tweets

    #Convert to lower case
    tweet = tweet.lower()
    #Convert www.* or https?://* to URL
    tweet = re.sub('((www\.[^\s]+)|(https?://[^\s]+))','URL',tweet)
    #Convert @username to AT_USER
    tweet = re.sub('@[^\s]+','AT_USER',tweet)
    #Remove additional white spaces
    tweet = re.sub('[\s]+', ' ', tweet)
    #Replace #word with word
    tweet = re.sub(r'#([^\s]+)', r'\1', tweet)
    #trim
    tweet = tweet.strip('\'"')
    return tweet
#end

stopWords = []

#start replaceTwoOrMore
def replaceTwoOrMore(s):
    #look for 2 or more repetitions of character and replace with the character itself
    pattern = re.compile(r"(.)\1{1,}", re.DOTALL)
    return pattern.sub(r"\1\1", s)
#end

#start getStopWordList
def getStopWordList(stopWordListFileName):
    #read the stopwords file and build a list
    stopWords = []
    stopWords.append('AT_USER')
    stopWords.append('URL')

    fp = open(stopWordListFileName, 'r')
    line = fp.readline()
    while line:
        word = line.strip()
        stopWords.append(word)
        line = fp.readline()
    fp.close()
    return stopWords
#end

#start getfeatureVector
def getFeatureVector(tweet):
    featureVector = []
    #split tweet into words
    words = tweet.split()
    for w in words:
        #replace two or more with two occurrences
        w = replaceTwoOrMore(w)
        #strip punctuation
        w = w.strip('\'"?,.')
        #check if the word stats with an alphabet
        val = re.search(r"^[a-zA-Z][a-zA-Z0-9]*$", w)
        #ignore if it is a stop word
        if(w in stopWords or val is None):
            continue
        else:
            featureVector.append(w.lower())
    return featureVector
#end

#start extract_features
def extract_features(tweet):
    tweet_words = set(tweet)
    features = {}
    for word in featureList:
        features['contains(%s)' % word] = (word in tweet_words)
    return features
#end

#Read the tweets one by one and process it
inpTweets = csv.reader(open('traindata.csv', 'rb'), delimiter=',', quotechar='|')
#stopWords = getStopWordList('data/feature_list/stopwords.txt')
featureList = []

# Get tweet words
tweets = []
for row in inpTweets:
    sentiment = row[0]
    tweet = row[1]
    processedTweet = processTweet(tweet)
    featureVector = getFeatureVector(processedTweet)
    featureList.extend(featureVector)
    tweets.append((featureVector, sentiment));
#end loop

# Remove featureList duplicates
featureList = list(set(featureList))

# Extract feature vector for all tweets in one shote
training_set = nltk.classify.util.apply_features(extract_features, tweets)
 

# Train the classifier
NBClassifier = nltk.NaiveBayesClassifier.train(training_set)

# Test the classifier
inputdata=csv.reader(open('data12-2.csv','rb'))
positive=0
negative=0
testTweet=[]
for row in inputdata:
	testTweet=row[1]
#testTweet = 'I do not think you are good boy.'
	processedTestTweet = processTweet(testTweet)
	result=NBClassifier.classify(extract_features(getFeatureVector(processedTestTweet)))
	#print result
#print NBClassifier.classify(extract_features(getFeatureVector(processedTestTweet)))
	if result == "positive":
		positive=positive+1
	else: 
		negative=negative+1

print(positive)
print(negative)

```
代码中要进行分类的twiiter数据集为data12-2.csv,其中testTweet=row[1]是获取twitter的文本信息。训练集traindata.csv来自[Movie Review Data](http://www.cs.cornell.edu/people/pabo/movie-review-data/)中的sentence polarity dataset v1.0,然后将数据经过变换成如下的形式。
```python
|positive|,|@PrincessSuperC Hey Cici sweetheart! Just wanted to let u know I luv u! OH! and will the mixtape drop soon? FANTASY RIDE MAY 5TH!!!!|
|positive|,|@Msdebramaye I heard about that contest! Congrats girl!!|
|positive|,|UNC!!! NCAA Champs!! Franklin St.: I WAS THERE!! WILD AND CRAZY!!!!!! Nothing like it...EVER http://tinyurl.com/49955t3|
|negative|,|Disappointing day. Attended a car boot sale to raise some funds for the sanctuary, made a total of 88p after the entry fee - sigh|
|negative|,|no more taking Irish car bombs with strange Australian women who can drink like rockstars...my head hurts.|
|negative|,|Just had some bloodwork done. My arm hurts|
```