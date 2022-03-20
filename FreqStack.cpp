
#include <deque>
#include <unordered_map>
using namespace std;

class FreqStack {
    
    unordered_map<int, deque<int>> groupsWithSameFrequency {};
    unordered_map<int, int> valueToFrequency{};
    int maxFrequency;
    
public:

    FreqStack() {
        maxFrequency = 0;
    }

    void push(int value) {
        int frequency = valueToFrequency[value] + 1;
        valueToFrequency[value] = frequency;
        groupsWithSameFrequency[frequency].push_back(value);
        maxFrequency = max(maxFrequency, frequency);
    }

    int pop() {
        int popValue = groupsWithSameFrequency[maxFrequency].back();
        groupsWithSameFrequency[maxFrequency].pop_back();

        if (valueToFrequency[popValue] == 1) {
            valueToFrequency.erase(popValue);
        } else {
            valueToFrequency[popValue]--;
        }

        if (groupsWithSameFrequency[maxFrequency].empty()) {
            groupsWithSameFrequency.erase(maxFrequency);
            maxFrequency--;
        }
        return popValue;
    }
};
