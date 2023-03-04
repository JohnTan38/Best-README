<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="200" height="160">
  </a>

  <h3 align="center">Market Basket Analysis, Apriori Algorithm and Asssociation</h3>

  <p align="center">
    A Market Basket Analysis project
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
   
   
    
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)


 This analysis is a practical implementation of the Apriori Algorithm via Python.<br>
    
 ## Primer on Apriori Algorithm & Association Rules<br>
 
Apriori algorithms is a data mining algorithm used for mining **frequent itemsets** and **relevant association rules**. It is devised to operate on a database that contain transactions -like, items bought by a customer in a store.<br>
    
An itemset can be considered ***frequent*** if it meets a user-specified support threshold. For example, if the support threshold is set to 0.5(50%), a frequent itemset is a set of items that are bought/purchased together in atleast 50% of all transactions.<br>
    
***Association rules*** are a set of rules derived from a database, that can help determining relationship among variables in a large transactional database.<br>

For example, let I ={i(1),i(2)...,i(m)} be a set of m attributes called items, and T={t(1),t(2),...,t(n)} be the set of transactions. Every transaction t(i) in T has a unique transaction ID, and it contains a subset of itemsets in I.<br>
    
Association rules are usually written as **i(j) -> i(k)**. This means that there is a strong relationship between the purchase of item i(j) and item i(k). Both these items were purchased together in the same transaction.<br>
    
In the above example, i(j) is the **antecedent** and i(k) is the **consequent**.<br>
    
Please note that both antecedents and consequents can have multiple items. For example, {Diaper,Gum} -> {Beer, Chips} is also valid.
 
Since multiplie rules are possible even from a very small database, i-order to select the most relevant ones, we use constraints on various measures of interest. The most important measures are discussed below. They are:<br>
    
* 1. Support : * The support of an itemset X, *supp(X)* is the proportion of transaction in the database in which the item X appears. It signifies the popularity of an itemset.<br>
    
    supp(X) = (Number of transactions in which X appears)/(Total number of transactions)
    
We can identify itemsets that have support values beyond this threshold as significant itemsets.<br>
    
* 2. Confidence :* Confidence of a rule signifies the likelihood of item Y being purchased when item X is purchased.<br>
    
Thus, 
    conf(X -> Y) = supp(X *U* Y) / supp( X )
    
If conf (X -> Y) is 75%, it implies that, for 75% of transactions containing X & Y, this rule is correct. It is more like a conditional probability, P(Y|X), that the probability of finding itemset Y in transactions fiven that the transaction already contains itemset X.<br>

* 3. Lift :* Lift explains the the likelihood of the itemset Y being purchased when itemset X is already purchased, while taking into account the popularity of Y.r>
    
Thus, 
    lift (X -> Y) = supp (X *U* Y)/( supp(X)  supp (Y) )
    
If the value of lift is greater than 1, it means that the itemset Y is likely to be bought with itemset X, while a value less than 1 implies that the itemset Y is unlikely to be bought if the itemset X is bought.<br>
    

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

Major frameworks/libraries used to bootstrap project.

* [![Python][Python]][Python-url]
* [![Githubl][Github.com]][GitHub-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

* pip
  ```sh
  pip install -r requirements
  ```

### Installation

Installing and setting up your app.

1. Run Jupyter notebook on Sagemaker at [https://bcg-rise-bda.awsapps.com/start#/](https://bcg-rise-bda.awsapps.com/start#/)
2. Clone the repo
   ```sh
   git clone https://github.com/JohnTan38/Best-README.git
   ```
3. Install packages
   ```sh
   pip install mlxtend
   ```
4. Import libraries
   ```python
   from mlxtend.frequent_patterns import apriori, association_rules
   from mlxtend.preprocessing import TransactionEncoder
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ANALYSIS EXAMPLES -->
## Association Rules & RFM Analysis (Recency, Frequency, Monetary)

Data Preprocessing and transformation - TransactionEncoder class from the MLXtend library
1. To find unique items - flatten the dataframe and convert into a set. The transformation removes any duplicate items
2. Fit the object of the class on the list and convert to dataframe.
3. for every item in a transaction, append 1 if purchased and 0 otherwise. 

 ```python
   # fitting the list and converting the transactions to true and false
   encoder = TransactionEncoder()
   transactions = encoder.fit(matcha_list).transform(matcha_list)
   
   # converting the transactions array to a datafrmae
   df = pd.DataFrame(transactions, columns=encoder.columns_)
   ```

### Market Basket Analysis

Market Basket Analysis is a data mining tool used by retailers to increase sales by better understanding customer purchasing patterns. 
Purchase history and items bought together are analyzed to reveal product groupings, as well as products that are likely to e purchased together.<br>

### Association Analysis

Association Analysis looks for relationships in large datasets. These relationships can take 2 forms: frequent item sets or association rules.
Frequent item sets are a collection of items that frequently occur together. Association rules suggest that a strong relationship exists between two items

### Frequently bought together
> ![Matcha and Hojicha](https://github.com/JohnTan38/Best-README/blob/master/images/MatchaHojichaLatte_asso.png)
<br>
> Matcha latte and Hojicha latte pair with high level of support and lift. Lift > 1 indicates that higher sales of antecedents lead to higher sales of consequents<br>

### Association Rule - Awakening Matcha Whisk set & Matcha Starter kit
> ![Awakening Matcha and Starter](https://github.com/JohnTan38/Best-README/blob/master/images/AwakeningMatcha.png)
<br>
> Awakening Matcha Whisk set and Matcha Starter kit bundle with high level of support and lift.<br>

### Association Rule - Min Support 3% and Lift > 2
> ![Association rule Support and Lift](https://github.com/JohnTan38/Best-README/blob/master/images/AssoRule_lift2.png)

> Closely associated products with minimum support of 3% and lift greater than 2. Customers who add item to cart could have closely associated items
> suggested to them before checkout.
> Different permutations and threholds of Support and Lift return differennt association rules.<br>


## RFM Analysis

Customers recency, frequency & monetary (transaction values) are analyzed and K Means clustering used to group customers into distinct segments<br>.
> ![Customer segmentation](https://github.com/JohnTan38/Best-README/blob/master/images/TopCustomers.png)<br>

Customer segmentation fine-tuned with detailed analysis and RFM segments identified. 
For example, top customers who buy frequently and with high ticket values in RFM segment '144' could be offered bundle of 'Awakening Matcha Whisk set' with 
'Ceremonial Uji Matcha Powder'.<br>
> ![RFM segment](https://github.com/JohnTan38/Best-README/blob/master/images/RFM_quartile.png)<br>

### Association Rule +  RFM - Opportunities for targetedcross-selling
> ![Association and RFM](https://github.com/JohnTan38/Best-README/blob/master/images/Top_RFM_segment.png)

> Customers' RFM segments and closely associated products provide opportuniites for targeted cross selling . Customers of RFM segment '444' who bought 'Awakening Matcha Whisk Set' could have 'Matcha Starter Kit' recommended.<br><br>
> 

### Sales Trends - 
> ![Matcha and Hojicha sales](https://github.com/JohnTan38/Best-README/blob/master/images/MatchaHojicha_Sales.png)
> Consistent all year sales except for last quarter of 2021.<br>

> ![Matcha Starter kit sales](https://github.com/JohnTan38/Best-README/blob/master/images/MatchaStarterKit_Sales.png)
> Matcha Starter Kit enjoys high support and lift. Sales campaign to smooth out sales trend during 2nd and 3rd quarters.
> Gross profit would be increased with a successful campaign. 


### Pros and Cons of Apriori Algorithm
    Easy to understand
    Suitable for large itemsets
    
    Computationally expensie if there are many association rules
    Calculating Support is expensive as algorithm goes through entire dataset

_For more examples, please refer to the [Documentation](httnps://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Fine tune threshold values for Support and Lift
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

# Contributors ✨
# Contributing

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<h3 align="left">Support:</h3>
<p><a href="https://www.buymeacoffee.com/vieming8"> <img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="buymeacoffeeJohnTan" /></a></p><br><br>


<br>
<a href="https://www.buymeacoffee.com/vieming8" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" height="50" width="210"></a>

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

* [![Gmail][Gmail]][Svelte-url]  vieming@gmail.com

Project Link: [https://github.com/JohnTan38/Best-README](https://github.com/JohnTan38/Best-README)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Python]: https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54
[Python-url]: https://python.org/

[Gmail]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[Gmail-url]: https://python.org/

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[GitHub.com]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[GitHub-url]: https://github.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
