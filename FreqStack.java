
import java.util.Deque;
import java.util.ArrayDeque;
import java.util.Map;
import java.util.HashMap;

public class FreqStack {

    Map<Integer, Deque<Integer>> groupsWithSameFrequency;
    Map<Integer, Integer> valueToFrequency;
    int maxFrequency;

    public FreqStack() {
        groupsWithSameFrequency = new HashMap();
        valueToFrequency = new HashMap<>();
    }

    public void push(int value) {
        int frequency = valueToFrequency.getOrDefault(value, 0) + 1;
        valueToFrequency.put(value, frequency);
        groupsWithSameFrequency.computeIfAbsent(frequency, values -> new ArrayDeque<>()).push(value);
        maxFrequency = Math.max(maxFrequency, frequency);
    }

    public int pop() {
        int popValue = groupsWithSameFrequency.get(maxFrequency).pop();

        if (valueToFrequency.get(popValue) == 1) {
            valueToFrequency.remove(popValue);
        } else {
            valueToFrequency.put(popValue, valueToFrequency.get(popValue) - 1);
        }

        if (groupsWithSameFrequency.get(maxFrequency).isEmpty()) {
            groupsWithSameFrequency.remove(maxFrequency);
            maxFrequency--;
        }

        return popValue;
    }
}
