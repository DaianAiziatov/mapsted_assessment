using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using mapsted.Models;


namespace mapsted.Controllers
{
    public class SortController : Controller
    {
        [HttpPost]
        [Route("api/sort")]
        public JsonResult Sort([FromBody] DataRequest request)
        {
            String userInput = request.userInput;
            String sortType = request.sortType;
            String valuesType = request.valuesType;
            // MARK: - Parsing input values into array
            String[] strings = userInput.Split(',');


            int[] arrayOfInts = new int[strings.Length];
            double[] arrayOfDoubles = new double[strings.Length];
            switch (valuesType)
            {
                case "int":
                    for (int i = 0; i < strings.Length; i++)
                    {
                        arrayOfInts[i] = Int32.Parse(strings[i]);
                    }
                    break;
                case "double":
                    for (int i = 0; i < strings.Length; i++)
                    {
                        arrayOfDoubles[i] = Double.Parse(strings[i]);
                    }
                    break;
                case "string":
                    for (int i = 0; i < strings.Length; i ++)
                    {
                        strings[i] = strings[i].Trim();
                    }
                    break;
            }

            switch (sortType)
            {
                case "quick":
                    switch (valuesType)
                    {
                        case "int":
                            return Json(QuickSort<int>(arrayOfInts));
                        case "double":
                            return Json(QuickSort<double>(arrayOfDoubles));
                        case "string":
                            return Json(QuickSort<String>(strings));
                        default:
                            return Json(new int[] { });
                    }
                case "bubble":
                    switch (valuesType)
                    {
                        case "int":
                            return Json(BubbleSort<int>(arrayOfInts));
                        case "double":
                            return Json(BubbleSort<double>(arrayOfDoubles));
                        case "string":
                            return Json(BubbleSort<String>(strings));
                        default:
                            return Json(new int[] { });
                    }
                default:
                    return Json(new int[] { });
            }
        }

        // MARK: - Bubble Sort
        private T[][] BubbleSort<T>(T[] array) where T : IComparable<T>
        {

            T[][] state = new T[array.Length - 1][];
            state[0] = (T[])array.Clone();

            for (int y = 0; y < array.Length; y++)
            {
                for (int i = 0; i < array.Length - 1; i++)
                {
                    if (array[i].CompareTo(array[i + 1]) > 0)
                    {
                        var tmp = array[i + 1];
                        array[i + 1] = array[i];
                        array[i] = tmp;
                        state[y + 1] = (T[])array.Clone();
                    }
                }
            }
            return state;
        }


        // MARK: - Quick Sort
        public T[][] QuickSort<T>(T[] input) where T : IComparable<T>
        {
            T[][] state = new T[input.Length - 1][];
            state[0] = (T[])input.Clone();
            var i = 1;

            System.Collections.Stack stack = new System.Collections.Stack();
            T pivot;
            int pivotIndex = 0;
            int leftIndex = pivotIndex + 1;
            int rightIndex = input.Length - 1;

            stack.Push(pivotIndex);//Push always with left and right
            stack.Push(rightIndex);

            int leftIndexOfSubSet, rightIndexOfSubset;

            while (stack.Count > 0)
            {
                rightIndexOfSubset = (int)stack.Pop();//pop always with right and left
                leftIndexOfSubSet = (int)stack.Pop();

                leftIndex = leftIndexOfSubSet + 1;
                pivotIndex = leftIndexOfSubSet;
                rightIndex = rightIndexOfSubset;

                pivot = input[pivotIndex];

                if (leftIndex > rightIndex)
                    continue;

                while (leftIndex < rightIndex)
                {
                    while ((leftIndex <= rightIndex) && (input[leftIndex].CompareTo(pivot) <= 0))
                        leftIndex++;    //increment right to find the greater 
                                        //element than the pivot

                    while ((leftIndex <= rightIndex) && (input[rightIndex].CompareTo(pivot) >= 0))
                        rightIndex--;//decrement right to find the 
                                     //smaller element than the pivot

                    if (rightIndex >= leftIndex)
                    {  //if right index is 
                        //greater then only swap
                        SwapElement<T>(ref input, leftIndex, rightIndex);
                        state[i++] = (T[])input.Clone();
                    }
                }

                if (pivotIndex <= rightIndex)
                    if (input[pivotIndex].CompareTo(input[rightIndex]) > 0)
                    {
                        SwapElement(ref input, pivotIndex, rightIndex);
                        state[i++] = input;
                    }

                if (leftIndexOfSubSet < rightIndex)
                {
                    stack.Push(leftIndexOfSubSet);
                    stack.Push(rightIndex - 1);
                }

                if (rightIndexOfSubset > rightIndex)
                {
                    stack.Push(rightIndex + 1);
                    stack.Push(rightIndexOfSubset);
                }
            }
            return state;
        }

        private static void SwapElement<T>(ref T[] arr, int left, int right)
        {
            T temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
        }


    }

}
