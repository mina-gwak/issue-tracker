package com.codesquad.issueTracker.common.factory;

import java.util.ArrayList;
import java.util.List;

import com.codesquad.issueTracker.label.domain.Label;

public class LabelFactory {
    private LabelFactory() {

    }

    public static Label mockSingleLabel(int num) {
        return new Label("label" + num, "description" + num, "color" + num, "txtColor" + num);
    }

    public static Label mockSingleLabelWithId(long num) {
        return new Label(num, "label" + num, "description" + num, "color" + num, "txtColor" + num);
    }

    public static List<Label> mockMultipleLabels(int count) {
        List<Label> labels = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            labels.add(mockSingleLabel(i));
        }
        return labels;
    }
}
