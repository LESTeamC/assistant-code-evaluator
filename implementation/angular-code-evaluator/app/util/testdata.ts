export class TestData{

    static codeBlock =  `
        /*
        * C Program To Identify the Missing Number in an Integer 
        * Array of Size N-1 with Numbers[1,N]
        */
        #include <stdio.h>
        #define MAX 15
        int missing_number_array(int [],int);
        
        int main()
        {
            int a[MAX], num, i, n;
        
            printf("enter the range of array&bsol;n");
            scanf("%d", &n);
            for (i = 0;i < n;i++)
            {
                printf("enter a[%d]element into the array:", i);
                scanf("%d", &a[i]);
            }
            num = missing_number_array(a, n);
            printf("The missing number -> %d\n", num);
        }
        
        /* To find the missing number in array */
        int missing_number_array(int a[],  int n)
        {
            int i;
            int s1 = 0; 
            int s2 = 0; 
        
            for (i = 0;i < n;i++)
                s1 = s1 ^ a[i];
            for (i = 1;i <= n + 1;i++)
                s2 = s2 ^ i; 
            return (s1 ^ s2);
        }
            `;
    static longString = 
        `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et ligula venenatis, convallis odio ornare, posuere quam. Phasellus molestie leo purus, sit amet iaculis nunc gravida id. Curabitur pretium lacus eget consequat interdum. Vivamus augue leo, tempor sit amet gravida quis, fringilla in nisl. Aenean pretium blandit ligula. Integer dignissim, mauris vel consequat porttitor, arcu urna accumsan ante, ac blandit sapien mauris at magna. Praesent ultrices molestie viverra. Sed pellentesque tempor consectetur. Curabitur faucibus risus eget elit gravida hendrerit. Integer odio lectus, faucibus a bibendum eu, sollicitudin ut massa. Nam et eros eu justo hendrerit tincidunt viverra quis augue. Nullam ac rutrum diam. Ut nec sem dignissim ante tristique molestie et a lorem. Vivamus egestas quam vitae sollicitudin vehicula. Fusce elementum lacus et metus blandit, et pulvinar dui maximus. Mauris at ultrices turpis.

Proin auctor efficitur eros id vehicula. Vivamus porttitor porttitor nibh, a iaculis nunc gravida accumsan. Sed tristique justo purus, vitae posuere elit ultricies a. Praesent eros nunc, accumsan a tempus et, dapibus in orci. Quisque placerat sit amet orci sit amet maximus. Fusce rhoncus placerat massa sed consectetur. Sed semper bibendum libero et vulputate. Nunc pulvinar magna et justo iaculis aliquam. Praesent aliquet nibh tortor, vel scelerisque leo suscipit quis.

In hac habitasse platea dictumst. Morbi a bibendum arcu, ut porta diam. Etiam congue ante non blandit vulputate. Duis feugiat viverra felis vel consectetur. Ut neque est, sagittis a erat non, pretium convallis neque. Duis rhoncus neque leo, ac posuere erat blandit a. Nunc tempor ipsum eget lectus sollicitudin, in porta erat luctus. Quisque ac fringilla massa, ut egestas diam. Praesent ut erat odio.

Morbi eleifend et felis nec maximus. Mauris et nisl viverra arcu vestibulum ultricies sed ac mauris. Quisque facilisis lorem a orci iaculis, quis vehicula urna tempor. Phasellus sapien nunc, efficitur eu tincidunt id, elementum vitae magna. Vivamus in elementum metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc eget faucibus ipsum. Nulla elementum risus sapien, ac tempor est varius ac. Duis sodales, mauris at accumsan varius, lorem purus aliquam mi, a tempor elit erat quis nisl. Pellentesque tempor sollicitudin risus, non condimentum ex ullamcorper et. Vivamus dignissim consectetur elit, in iaculis nulla fermentum vitae. Maecenas dictum eu purus at tincidunt. Integer posuere elit erat, ac finibus libero tristique nec. Morbi id viverra nulla.

Suspendisse velit massa, fringilla id lorem et, feugiat blandit arcu. Morbi nulla diam, cursus eget dui vitae, condimentum tempus quam. Cras placerat dapibus lorem, eget porta sem varius quis. Curabitur at vestibulum magna. Sed scelerisque elit semper magna iaculis varius. Curabitur pulvinar eros odio, efficitur bibendum risus iaculis non. Sed interdum enim pellentesque laoreet consectetur. Nam sed consequat neque. Maecenas lectus metus, condimentum pharetra mauris in, dapibus mollis enim. Suspendisse nec nulla porttitor, ornare mauris in, lobortis libero. Pellentesque rhoncus, quam ac venenatis fringilla, urna mi tristique dui, sit amet ultricies leo mauris posuere eros. Vestibulum id erat augue. Fusce quis quam quis mi commodo scelerisque. Morbi a massa sit amet nunc viverra fringilla sit amet eget risus.
    `;

}