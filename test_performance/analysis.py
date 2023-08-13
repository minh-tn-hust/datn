list_result = [
    './cpp_test_result.txt',
    './go_test_result.txt',
    './java_test_result.txt',
]

LANGUAGE_KEY_WORD = [
    'GO',
    'JAVA',
    'CPP'
]

DATA_ANALYSIS = {
    "CPP" : [],
    "JAVA" : [],
    "GO" : []
}

INDEX_VALUE = {
    "_50" : 0,
    "_75" : 1,
    "_100" : 2,
    "_150" : 3,
    "_200" : 4
}

INDEX_VALUE

def is_contain_keyword(log_line):
    for index, keyword in enumerate(LANGUAGE_KEY_WORD):
        if (keyword in log_line):
            return True

    return False

def process_set(analysis_set):
    result = {
        "max_time" : -1,
        "min_time" : -1,
        "average_time" : -1
    }

    accumulate_time = 0
    min_time = float('inf')
    max_time = float('-inf')

    number_of_test = 0
    for value in analysis_set.values():
        begin_time = int(value["beginTime"])
        end_time = int(value["endTime"])
        duration = (end_time - begin_time) / 1000
        
        accumulate_time += duration
        min_time = min(min_time, duration)
        max_time = max(max_time, duration)
        number_of_test += 1
    
    result["min_time"] = min_time
    result["max_time"] = max_time
    result["average_time"] = accumulate_time / number_of_test
    
    return result


for i in range(0, 3):
    with open(list_result[i], 'r') as file:
        execution_logs = file.readlines()
        key_word = ""
        number_of_test = -1
        analysis_set = {}

        for index, log_line in enumerate(execution_logs):
            element = log_line.split()
            if (is_contain_keyword(log_line)):
                if not not analysis_set:
                    DATA_ANALYSIS[key_word].append(process_set(analysis_set))
                    analysis_set = {}

                key_word = element[0]
                number_of_test = element[1]
            else :
                [date, time, key, state, timestamp] = element
                if (key not in analysis_set):
                    analysis_set[key] = {}
                    analysis_set[key][state] = timestamp
                else :
                    analysis_set[key][state] = timestamp

        if not not analysis_set:
            DATA_ANALYSIS[key_word].append(process_set(analysis_set))

import matplotlib.pyplot as plt

languages = list(DATA_ANALYSIS.keys())
metrics = ['max_time', 'min_time', 'average_time']
metric_titles = ['Thời gian chờ lâu nhất', 'Thời gian chờ ngắn nhất', 'Thời gian chờ trung bình']

for index, metric in enumerate(metrics):
    plt.figure(figsize=(10, 6))
    for language_index, language in enumerate(languages):
        values = [item[metric] for item in DATA_ANALYSIS[language]]
        x_values = [50, 75, 100, 150, 200]
        x_values_shifted = [x + language_index * 5 for x in x_values]
        plt.bar(x_values_shifted, values, label=language, width=5)

    plt.xlabel('Số lượng bài chấm cùng lúc')
    plt.ylabel(metric_titles[index] +  " (giây)")
    plt.title(f'{metric_titles[index]} đối với các ngôn ngữ')
    plt.xticks([-5 + x for x in x_values_shifted], x_values)
    plt.legend()
    plt.show()
